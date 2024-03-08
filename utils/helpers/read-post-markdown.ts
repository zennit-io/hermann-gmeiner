import fs from "fs";
import path from "path";
//
import matter from "gray-matter";
//
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import emoji from "remark-emoji";
//
export type PostMetadata = {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  categories: string[];
  tags: string[];
  length: string;
  authorAvatar?: string;
};
export type Post = {
  id: number | string;
  contentHtml: string;
} & PostMetadata;
//
const POSTS_DIRECTORY = path.join(process.cwd(), "posts");

const readPostMarkdown = async (id: number | string): Promise<Post> => {
  const fullPath = path.join(POSTS_DIRECTORY, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(gfm)
    .use(emoji)
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as PostMetadata),
  };
};

export default readPostMarkdown;
