//
import getPostData from "@/db/utils/actions/post/get-post-data";
import PostView from "@/components/general/PostView";

const SchoolHistoryPage = async () => {
  const postData = await getPostData("historia-e-shkolles");
  return <PostView postData={postData} />;
};

export default SchoolHistoryPage;
