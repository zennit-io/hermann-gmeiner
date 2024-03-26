import readArticle from "@/db/actions/article/read-article";
//
import type { DynamicRoute } from "@/types/navigation/DynamicRoute";
import PostView from "@/components/general/PostView";

const ProjectPage = async (params: DynamicRoute<"id">) => {
  const { id } = params.params;
  const postData = await readArticle(Number(id));
  return <PostView postData={postData} />;
};
export default ProjectPage;
