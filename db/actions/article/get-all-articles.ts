"use server";
import db from "@/db/drizzle";
import { Article, ArticleTag, Tag } from "@/db/schema";
import { sql } from "drizzle-orm";

type GetAllArticles = {
  page: number;
  pageSize?: number;
};
export const getAllArticles = async ({
  page,
  pageSize = 15,
}: GetAllArticles) => {
  const offset = (page - 1) * pageSize;
  const articles = await db
    .select()
    .from(Article)
    .limit(pageSize)
    .offset(offset);

  return await Promise.all(
    articles.map(async (article) => {
      const tagsIds = await db.select().from(ArticleTag)
        .where(sql`${ArticleTag.articleId}
      =
      ${article.id}`);
      const tagList = await Promise.all(
        tagsIds.map(async (tag) => {
          const [selectedTag] = await db.select().from(Tag).where(sql`${Tag.id}
          =
          ${tag.tagId}`);
          return selectedTag.name;
        })
      );
      return {
        ...article,
        tagList,
      };
    })
  );
};
