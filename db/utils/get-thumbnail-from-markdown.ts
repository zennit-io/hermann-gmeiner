export const getThumbnailFromMarkdown = (markdown: string) => {
  const regex = /!\[.*?]\((.*?)\)/;
  const match = markdown.match(regex);
  return match ? match[1].replace("localhost", "static") : null;
};
