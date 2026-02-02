import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Partial schema matching Payload CMS structure
export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  content: text('content', { mode: 'json' }),
  updatedAt: text('updated_at').notNull(),
  createdAt: text('created_at').notNull(),
});
