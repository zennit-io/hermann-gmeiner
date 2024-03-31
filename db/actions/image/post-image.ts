"use server";
import path from "path";
import { createWriteStream, mkdirSync } from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import { webToNodeStream } from "@/db/utils/web-to-node-stream";
import { readdirSync } from "node:fs";

const asyncPipeline = promisify(pipeline);

const POSTS_IMAGES_DIRECTORY = "/app/static/images";
/**
 * This is a function that saves an image to the server and returns the path to the image
 * @param data - FormData containing the image
 * @returns the path to the image that the markdown editor can use to display the image
 *
 * */

export const postImage = async (data: FormData) => {
  const image = data.get("image") as File;
  if (!image) throw new Error("No image provided");

  const fileList = readdirSync("/app/static/images");

  const fileName =
    fileList.length + "." + (image.name.split(".").at(-1) ?? "png");
  const filePath = path.join(POSTS_IMAGES_DIRECTORY, fileName);

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

  return "http://localhost:8080/images/" + fileName;
};
