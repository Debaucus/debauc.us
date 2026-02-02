import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
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
  ],
}
