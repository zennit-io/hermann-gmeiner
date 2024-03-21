import getPostData from "@/db/utils/actions/post/get-post-data";
//
import type { DynamicRoute } from "@/types/navigation/DynamicRoute";
import PostView from "@/components/general/PostView";

const ProjectPage = async (params: DynamicRoute<"id">) => {
  const { id } = params.params;
  const postData = await getPostData(Number(id));
  return <PostView postData={postData} />;
};
export default ProjectPage;
