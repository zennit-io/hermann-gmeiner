export const getDescriptionFromMarkdown = (markdownText: string) => {
  const noFrontmatter = markdownText.replace(/---[\s\S]*?---/, "");
  const cleanedText = noFrontmatter.replace(/[*_~`#>[\]()|-]/g, "");
  return cleanedText.slice(0, 150);
};
