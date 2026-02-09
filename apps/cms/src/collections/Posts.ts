import type { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  CodeBlock,
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'projectLink',
      type: 'text',
      required: false,
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'authors',
      hasMany: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            return data?.title
              ?.toLowerCase()
              .replace(/ /g, '-')
              .replace(/[^\w-]+/g, '')
          },
        ],
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature(),
          BlocksFeature({
            blocks: [
              CodeBlock({
                fieldOverrides: {
                  fields: [
                    {
                      name: 'language',
                      type: 'select',
                      // admin: { hidden: true }, // Unhide for debugging
                      options: [
                        { label: 'TypeScript', value: 'typescript' },
                        { label: 'JavaScript', value: 'javascript' },
                        { label: 'HTML', value: 'html' },
                        { label: 'CSS', value: 'css' },
                        { label: 'Python', value: 'python' },
                        { label: 'Rust', value: 'rust' },
                        { label: 'XML', value: 'xml' },
                        // Add more as needed or rely on defaults if not overriding options
                      ],
                    },
                    {
                      name: 'code',
                      type: 'code',
                    },
                  ],
                },
              }),
            ],
          }),
        ],
      }),
    },
    lexicalHTML('content', { name: 'content_html' }),
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
