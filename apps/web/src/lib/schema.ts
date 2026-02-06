import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from "drizzle-orm";

// Full schema matching Payload CMS structure
export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  content: text("content", { mode: "json" }),
  content_html: text("content_html"),
  projectLink: text("project_link"),
  excerpt: text("excerpt"),
  status: text("status"),
  publishedDate: text("published_date"),
  coverImageId: integer("cover_image_id"),
  updatedAt: text("updated_at").notNull(),
  createdAt: text("created_at").notNull(),
});

export const media = sqliteTable("media", {
  id: integer("id").primaryKey(),
  url: text("url"),
  filename: text("filename"),
  alt: text("alt"),
});

export const authors = sqliteTable("authors", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio"),
  // photo relation omitted for brevity unless needed
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug"),
});

export const postsRels = sqliteTable("posts_rels", {
  id: integer("id").primaryKey(),
  parentId: integer("parent_id").notNull(),
  path: text("path").notNull(),
  authorsId: integer("authors_id"),
  categoriesId: integer("categories_id"),
  order: integer("order"),
});

// Relations
export const postsRelations = relations(posts, ({ one, many }) => ({
  coverImage: one(media, {
    fields: [posts.coverImageId],
    references: [media.id],
  }),
  authorsLink: many(postsRels),
  categoriesLink: many(postsRels),
}));

export const postsRelsRelations = relations(postsRels, ({ one }) => ({
  post: one(posts, {
    fields: [postsRels.parentId],
    references: [posts.id],
  }),
  author: one(authors, {
    fields: [postsRels.authorsId],
    references: [authors.id],
  }),
  category: one(categories, {
    fields: [postsRels.categoriesId],
    references: [categories.id],
  }),
}));
