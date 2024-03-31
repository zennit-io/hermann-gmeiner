import { date, integer, pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const Article = pgTable("article", {
    id: integer("id").primaryKey(),
    title: text("title").notNull(),
    thumbnail: text("thumbnail"),
    description: text("content").notNull(),
    length: text("length").notNull(),
    createdAt: date("created_at").notNull(),
});

export const Tag = pgTable("tag", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    createdAt: date("created_at").notNull(),
});

export const User = pgTable("user", {
    id: integer("id").primaryKey(),
    email: text("email").notNull(),
    username: text("username").notNull(),
    password: text("password").notNull(),
    type: text("type", { enum: ["staff", "admin"] }).notNull(),
    createdAt: date("created_at").notNull(),
});

export const ArticleTag = pgTable("article_tag", {
    articleId: integer("article_id").notNull(),
    tagId: integer("tag_id").notNull(),
});

export const ArticleRelations = relations(Article, ({ many }) => ({
    tags: many(ArticleTag, {
        relationName: "tagList",
    }),
}));

export const TagRelations = relations(Tag, ({ many }) => ({
    articles: many(ArticleTag, {
        relationName: "articleList",
    }),
}));
