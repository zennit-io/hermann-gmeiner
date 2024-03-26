"use server";
import fs from "fs";
import path from "path";
//
import db from "@/db/drizzle";
import { Article, Tag } from "@/db/schema";
//
import matter from "gray-matter";

type CreateArticle = {
  content: string;
  thumbnail: string | null;
  description: string;
};
const POSTS_DIRECTORY = "/app/static/articles";
export const createArticle = async ({
  content,
  thumbnail,
  description,
}: CreateArticle) => {
  // read directory
  const filesAndDirectories = fs.readdirSync(POSTS_DIRECTORY);
  const files = filesAndDirectories.filter((name) => {
    return fs.statSync(path.join(POSTS_DIRECTORY, name)).isFile();
  });
  const id = files.length;
  // handling markdown
  const { data } = matter(content);
  const title = data.title;
  const tags: string = data.tags.toString();
  const length = data.length;
  const lastTagId = await db
    .select()
    .from(Tag)
    .then((tags) => tags.length);

  await db
    .insert(Tag)
    .values(
      tags
        .split(",")
        .map((name, i) => ({ name, articleId: id, id: lastTagId + i }))
    );
  // Save the markdown content into a file
  const filePath = path.join(POSTS_DIRECTORY, `${id}.md`);
  fs.writeFileSync(filePath, content);

  return db.insert(Article).values({
    length,
    id,
    title,
    description,
    thumbnail: thumbnail === "-" ? null : thumbnail,
  });
};
