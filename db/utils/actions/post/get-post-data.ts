"use server";
//
import readPostMarkdown from "../../helpers/read-post-markdown";

const getPostData = async (id: number | string) => {
  return await readPostMarkdown(id);
};

export default getPostData;
