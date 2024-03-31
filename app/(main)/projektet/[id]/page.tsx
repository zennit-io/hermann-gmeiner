import readArticle from "@/db/actions/article/read-article";
//
import type { DynamicRouteProps } from "@/types/navigation/DynamicRouteProps";
import PostView from "@/components/general/PostView";

const ProjectPage = async (params: DynamicRouteProps<"id">) => {
  const { id } = params.params;
  const postData = await readArticle(Number(id));
  return <PostView postData={postData} />;
};
export default ProjectPage;
