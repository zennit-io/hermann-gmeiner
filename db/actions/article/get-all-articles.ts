"use server";
import db from "@/db/drizzle";
import { Article, Tag } from "@/db/schema";
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
      const tags = await db.select().from(Tag).where(sql`${Tag.articleId}
      =
      ${article.id}`);
      return {
        ...article,
        tagList: tags.map((tag) => tag.name),
      };
    })
  );
};
