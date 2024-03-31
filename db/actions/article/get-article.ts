"use server";
import db from "@/db/drizzle";
import { Article } from "@/db/schema";
import { sql } from "drizzle-orm";
import fs from "fs";

export const getArticle = async (id: number) => {
  const articleRecord = await db
    .select()
    .from(Article)
    .where(
      sql` ${Article.id} =
      ${id} `
    )
    .then((articles) => articles[0]);

  const markdownFile = fs.readFileSync(`/app/static/articles/${id}.md`, "utf8");
  return {
    ...articleRecord,
    content: markdownFile,
  };
};
