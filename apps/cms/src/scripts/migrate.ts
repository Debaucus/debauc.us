import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const OLD_BLOG_DIR = 'C:\\Users\\Sito\\Documents\\GitHub\\debauc.usOld\\data\\blog'

// Simple Markdown Parser to Lexical
function convertMarkdownToLexical(markdown: string, mediaMap: Map<string, string>) {
  const root: any = {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    children: [],
  }

  const lines = markdown.split('\n')
  let currentParagraph: any = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (!line) {
      if (currentParagraph) {
        root.children.push(currentParagraph)
        currentParagraph = null
      }
      continue
    }

    // Headings
    if (line.startsWith('#')) {
      if (currentParagraph) {
        root.children.push(currentParagraph)
        currentParagraph = null
      }
      const level = line.match(/^#+/)?.[0].length || 1
      const text = line.replace(/^#+\s*/, '')
      root.children.push({
        type: 'heading',
        tag: `h${level}`,
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            text: text,
            format: 0,
            detail: 0,
            mode: 'normal',
            style: '',
          },
        ],
      })
      continue
    }

    // Images: ![alt](src)
    const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/)
    if (imageMatch) {
      if (currentParagraph) {
        root.children.push(currentParagraph)
        currentParagraph = null
      }
      const alt = imageMatch[1]
      const src = imageMatch[2]
      // Try to find filename from src
      const filename = path.basename(src)
      const mediaId = mediaMap.get(filename) || mediaMap.get(decodeURIComponent(filename))

      if (mediaId) {
        root.children.push({
          type: 'upload',
          format: '',
          indent: 0,
          version: 1,
          value: mediaId,
          relationTo: 'media',
          fields: {
             // Basic fields if needed, but upload usually just needs value/relationTo
          }
        })
      } else {
         // Fallback to text if image not found in CMS
         root.children.push({
             type: 'paragraph',
             format: '',
             indent: 0,
             version: 1,
             children: [{
                 type: 'text',
                 text: `[MISSING IMAGE: ${alt} - ${src}]`,
                 format: 0,
                 detail: 0,
                 mode: 'normal',
                 style: ''
             }]
         })
      }
      continue
    }

    // Paragraphs
    if (!currentParagraph) {
      currentParagraph = {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [],
      }
    } else {
       // Add space if continuing paragraph
       currentParagraph.children.push({
          type: 'text',
          text: ' ',
          format: 0,
          detail: 0,
          mode: 'normal',
          style: ''
       })
    }

    // Basic text for now (ignoring inline bold/italic parsing for simplicity)
    currentParagraph.children.push({
      type: 'text',
      text: line,
      format: 0,
      detail: 0,
      mode: 'normal',
      style: '',
    })
  }

  if (currentParagraph) {
    root.children.push(currentParagraph)
  }

  return root
}

async function run() {
  const payload = await getPayload({ config })

  // 1. Fetch all media to build a map of Filename -> ID
  const allMedia = await payload.find({
    collection: 'media',
    limit: 1000,
  })
  
  const mediaMap = new Map<string, string>()
  allMedia.docs.forEach((doc: any) => {
    if (doc.filename) {
       mediaMap.set(doc.filename, doc.id)
    }
  })

  // 2. Fetch all categories to map tags
  const allCategories = await payload.find({
      collection: 'categories',
      limit: 1000
  })
  const categoryMap = new Map<string, string>() // slug -> id
  allCategories.docs.forEach((doc: any) => {
      if (doc.slug) categoryMap.set(doc.slug, doc.id)
  })

  // 3. Read files
  const files = fs.readdirSync(OLD_BLOG_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
  console.log(`Found ${files.length} files to migrate.`)

  for (const file of files) {
    console.log(`Processing ${file}...`)
    const rawContent = fs.readFileSync(path.join(OLD_BLOG_DIR, file), 'utf-8')
    
    // Parse Frontmatter
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/
    const match = rawContent.match(frontmatterRegex)
    
    if (!match) {
        console.warn(`Skipping ${file}: No frontmatter found.`)
        continue
    }

    const frontmatterLines = match[1].split('\n')
    const metadata: any = {}
    frontmatterLines.forEach(line => {
        const parts = line.split(':')
        if (parts.length >= 2) {
            const key = parts[0].trim()
            let value = parts.slice(1).join(':').trim()
            // Remove quotes
            if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
                value = value.slice(1, -1)
            }
            // Array handling [a, b]
            if (value.startsWith('[') && value.endsWith(']')) {
                const arr = value.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''))
                metadata[key] = arr
            } else {
                metadata[key] = value
            }
        }
    })

    const body = rawContent.replace(frontmatterRegex, '').trim()

    // Map fields
    const title = metadata.title || file
    const publishedDate = metadata.date ? new Date(metadata.date).toISOString() : new Date().toISOString()
    const summary = metadata.summary || ''
    const slug = file.replace(/\.(mdx|md)$/, '')
    
    // Tags -> Categories
    const categoryIds: string[] = []
    if (metadata.tags && Array.isArray(metadata.tags)) {
        for (const tag of metadata.tags) {
            const tagSlug = tag.toLowerCase().replace(/ /g, '-')
            if (categoryMap.has(tagSlug)) {
                categoryIds.push(categoryMap.get(tagSlug)!)
            } else {
                // Create new category
                console.log(`Creating category: ${tag}`)
                const newCat = await payload.create({
                    collection: 'categories',
                    data: {
                        title: tag.charAt(0).toUpperCase() + tag.slice(1),
                        slug: tagSlug
                    }
                })
                categoryMap.set(tagSlug, newCat.id)
                categoryIds.push(newCat.id)
            }
        }
    }

    // Cover Image
    let coverImageId = null
    if (metadata.previewImage) {
        const coverFilename = path.basename(metadata.previewImage)
        coverImageId = mediaMap.get(coverFilename)
    }

    // Generate Lexical Content
    const content = convertMarkdownToLexical(body, mediaMap)

    // Check if exists
    const existing = await payload.find({
        collection: 'posts',
        where: {
            slug: {
                equals: slug
            }
        }
    })

    if (existing.docs.length > 0) {
        console.log(`Updating ${slug}...`)
        await payload.update({
            collection: 'posts',
            id: existing.docs[0].id,
            data: {
                title,
                publishedDate,
                excerpt: summary,
                content: { root: content },
                categories: categoryIds,
                coverImage: coverImageId ? coverImageId : undefined,
                projectLink: metadata.websiteURL, // Map websiteURL to projectLink
                status: metadata.draft === 'true' || metadata.draft === true ? 'draft' : 'published'
            }
        })
    } else {
        console.log(`Creating ${slug}...`)
        await payload.create({
            collection: 'posts',
            data: {
                title,
                slug,
                publishedDate,
                excerpt: summary,
                content: { root: content },
                categories: categoryIds,
                coverImage: coverImageId ? coverImageId : undefined,
                projectLink: metadata.websiteURL,
                status: metadata.draft === 'true' || metadata.draft === true ? 'draft' : 'published'
            }
        })
    }
  }

  console.log('Migration complete.')
  process.exit(0)
}

run()
