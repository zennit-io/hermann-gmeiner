"use server";
import db from "@/db/drizzle";
import { Article } from "@/db/schema";
import { sql } from "drizzle-orm";
import fs from "fs";
import matter from "gray-matter";

export const getArticle = async (id: number) => {
  const articleRecord = await db
    .select()
    .from(Article)
    .where(
      sql` ${Article.id} =
      ${id} `
    )
    .then((articles) => articles[0]);

  const markdownFile = fs.readFileSync(
    `${process.env.ARTICLE_PATH}/${id}.md`,
    "utf8"
  );
  const { content, data } = matter(markdownFile);
  return {
    ...articleRecord,
    content,
    data,
  };
};
