"use server";
import fs from "fs";
import path from "path";
//
import db from "@/db/drizzle";
import { Article, ArticleTag, Tag } from "@/db/schema";
//
import matter from "gray-matter";
import { sql } from "drizzle-orm";

type CreateArticle = {
  content: string;
  thumbnail: string | null;
  description: string;
};
export const createArticle = async ({
  content,
  thumbnail,
  description,
}: CreateArticle) => {
  // read directory
  const filesAndDirectories = fs.readdirSync(process.env.ARTICLE_PATH);
  const files = filesAndDirectories.filter((name) => {
    return fs.statSync(path.join(process.env.ARTICLE_PATH, name)).isFile();
  });
  const id = files.length;

  // handling markdown
  const { data } = matter(content);
  const title = data.title;
  const tags: string = data.tags.toString();
  const length = data.length;
  //
  const [newArticle] = await db
    .insert(Article)
    .values({
      length,
      id,
      title,
      description,
      createdAt: new Date().toISOString(),
      thumbnail: thumbnail === "-" ? null : thumbnail,
    })
    .returning();

  let lastTagId = await db
    .select()
    .from(Tag)
    .then((tags) => tags.length);

  for (const tagName of tags.split(",")) {
    let tagId;

    // Check if the tag exists in the database
    const [existingTag] = await db.select().from(Tag).where(sql` ${Tag.name} =
    ${tagName} `);

    if (existingTag) {
      // If the tag exists, get its id
      tagId = existingTag.id;
    } else {
      // If the tag doesn't exist, insert it into the database and get the inserted tag's id
      await db.insert(Tag).values({
        name: tagName,
        id: lastTagId,
        createdAt: new Date().toISOString(),
      });
      tagId = lastTagId;
      lastTagId++;
    }

    // Insert a new record into the article_tag table with the article's id and the tag's id
    await db.insert(ArticleTag).values({
      articleId: newArticle.id,
      tagId,
    });
  }
  // Save the markdown content into a file
  const filePath = path.join(process.env.ARTICLE_PATH, `${id}.md`);
  fs.writeFileSync(filePath, content);

  return newArticle;
};
