import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
/* Imports for Feed.xml
import generateRss from '@/lib/generate-rss'
import fs from 'fs'
import path from 'path'
*/
const root = process.cwd()

export async function getStaticPaths() {
  const tags = await getAllTags('blog')

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter('blog')
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  // rss
  /* Feed.xml removed for testing. 
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `tags/${params.tag}/feed.xml`)
    const rssPath = path.join(root, 'public', 'tags', params.tag)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }
  */

  return { props: { posts: filteredPosts, tag: params.tag } }
}

export default function Tag({ posts, tag }) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)

  const newTitle = tag.split('-')

  for (let i = 0; i < newTitle.length; i++) {
    newTitle[i] = newTitle[i][0].toUpperCase() + newTitle[i].substr(1)
  }

  return (
    <>
      <TagSEO
        title={`${newTitle.join(' ')} - ${siteMetadata.headerTitle}`}
        description={`Help and Advice blog posts about ${newTitle.join(' ')}. Made by the ${
          siteMetadata.headerTitle
        } to help you with your pets! If you have any additional questions, please feel free to contact me.`}
      />
      <ListLayout posts={posts} title={newTitle.join(' ')} />
    </>
  )
}
