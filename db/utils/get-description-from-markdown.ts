import { remark } from "remark";
import strip from "strip-markdown";
import matter from "gray-matter";

export const getDescriptionFromMarkdown = async (markdownText: string) => {
  // Parse the Markdown text with gray-matter to extract the content without the frontmatter
  const { content } = matter(markdownText);

  // Process the content with remark and strip-markdown to remove all Markdown syntax
  const result = await remark().use(strip).process(content);

  // Convert the result to a string and return the first 150 characters
  const text = String(result);
  return text.slice(0, 150);
};
