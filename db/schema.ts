import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const Article = pgTable("article", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  thumbnail: text("thumbnail"),
  description: text("content").notNull(),
  length: text("length").notNull(),
});
export const Tag = pgTable("tag", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  articleId: integer("article_id").notNull(),
});

export const TagGroup = pgTable("tag_group", {
  id: integer("id").primaryKey(),
  articleId: integer("article_id").notNull(),
});

export const TagGroupRelations = relations(TagGroup, ({ one, many }) => ({
  article: one(Article, {
    fields: [TagGroup.articleId],
    references: [Article.id],
  }),
  tags: many(Tag),
}));

export const ArticleRelations = relations(Article, ({ many }) => ({
  tags: many(Tag),
}));

export const TagRelations = relations(Tag, ({ one }) => ({
  article: one(Article, {
    fields: [Tag.articleId],
    references: [Article.id],
  }),
}));
