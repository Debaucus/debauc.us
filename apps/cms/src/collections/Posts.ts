import type { CollectionConfig } from 'payload'

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
             if (value) return value;
             return data?.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
           }
        ]
      }
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
        name: 'coverImage',
        type: 'upload',
        relationTo: 'media',
    }
  ],
}
