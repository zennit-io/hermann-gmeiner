"use server";
import path, { join, resolve } from "path";
import { createWriteStream, mkdirSync } from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import { webToNodeStream } from "@/db/utils/helpers/web-to-node-stream";

import db from "@/db/drizzle";
import { Article, Image } from "@/db/schema";
import { count } from "drizzle-orm";

const asyncPipeline = promisify(pipeline);

const POSTS_IMAGES_DIRECTORY_LOCAL = join(process.cwd(), "posts", "images");
const POSTS_IMAGES_DIRECTORY = resolve(__dirname, "posts", "images");

export const postImageFs = async (data: FormData) => {
  const image = data.get("image") as File;
  if (!image) throw new Error("No image provided");

  const filePath = path.join(
    POSTS_IMAGES_DIRECTORY,
    encodeURIComponent(image.name)
  );
  const localFilePath = path.join(
    POSTS_IMAGES_DIRECTORY_LOCAL,
    encodeURIComponent(image.name)
  );
  // ensuring that the directory exists
  const dir = path.dirname(filePath);
  const localDir = path.dirname(localFilePath);
  //
  mkdirSync(dir, { recursive: true });
  mkdirSync(localDir, { recursive: true });
  //
  const nodeStream = webToNodeStream(image.stream());
  //
  const writeStream = createWriteStream(filePath);
  const localWriteStream = createWriteStream(localFilePath);
  //
  await asyncPipeline(nodeStream, writeStream);
  await asyncPipeline(nodeStream, localWriteStream);

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
