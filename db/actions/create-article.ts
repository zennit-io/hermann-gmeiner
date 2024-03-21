"use server";
import fs from "fs";
import path, { resolve } from "path";
//
import db from "@/db/drizzle";
import { Article, Tag } from "@/db/schema";
//
import matter from "gray-matter";

type CreateArticle = {
  content: string;
};
const DIR = resolve(__dirname, "/posts/");
export const createArticle = async ({ content }: CreateArticle) => {
  // read directory
  const filesAndDirectories = fs.readdirSync(DIR);
  const files = filesAndDirectories.filter((name) => {
    return fs.statSync(path.join(DIR, name)).isFile();
  });
  const id = files.length;
  // handling markdown
  const { data } = matter(content);
  const title = data.title;
  const tags = data.tags;
  db.insert(Tag).values(tags.map((name: string) => ({ name, articleId: id })));
  // Save the markdown content into a file
  const filePath = path.join(DIR, `${id}.md`);
  fs.writeFileSync(filePath, content);

  return db.insert(Article).values({
    id,
    title,
  });
};
