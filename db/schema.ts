import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const Article = pgTable("article", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
});

export const Image = pgTable("image", {
  id: integer("id").primaryKey(),
  url: text("url").notNull(),
  articleId: integer("article_id").notNull(),
});

export const Tag = pgTable("tag", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  articleId: integer("article_id").notNull(),
});

export const ArticleRelations = relations(Article, ({ many }) => ({
  tags: many(Tag),
}));

export const TagRelations = relations(Tag, ({ one }) => ({
  article: one(Article, {
    fields: [Tag.articleId],
    references: [Article.id],
  }),
}));

export const ImageRelations = relations(Image, ({ one }) => ({
  article: one(Article, {
    fields: [Image.articleId],
    references: [Article.id],
  }),
}));
