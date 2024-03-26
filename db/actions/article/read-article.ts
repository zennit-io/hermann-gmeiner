"use server";
//
import readArticleMarkdown from "../../utils/read-article-markdown";

const readArticle = async (id: number | string) => {
  return await readArticleMarkdown(id);
};

export default readArticle;
