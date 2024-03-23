"use server";
import path, { resolve } from "path";
import { createWriteStream, mkdirSync } from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import { webToNodeStream } from "@/db/utils/helpers/web-to-node-stream";

import db from "@/db/drizzle";
import { Article, Image } from "@/db/schema";
import { count } from "drizzle-orm";

const asyncPipeline = promisify(pipeline);

const POSTS_IMAGES_DIRECTORY = resolve(__dirname, "uploads");

export const postImageFs = async (data: FormData) => {
  const image = data.get("image") as File;
  if (!image) throw new Error("No image provided");

  const filePath = path.join(
    POSTS_IMAGES_DIRECTORY,
    encodeURIComponent(image.name)
  );

  // ensuring that the directory exists
  const dir = path.dirname(filePath);
  //
  mkdirSync(dir, { recursive: true });
  //
  const nodeStream = webToNodeStream(image.stream());
  //
  const writeStream = createWriteStream(filePath);
  //
  await asyncPipeline(nodeStream, writeStream);

  const id = await db
    .select({ count: count() })
    .from(Image)
    .then((result) => result[0].count + 1);

  const articleId = await db
    .select({ count: count() })
    .from(Article)
    .then((result) => result[0].count + 1);

  await db.insert(Image).values({ articleId, id, url: filePath });

  return filePath;
};
