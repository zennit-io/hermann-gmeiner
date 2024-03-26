//
import readArticle from "@/db/actions/article/read-article";
import PostView from "@/components/general/PostView";

const SchoolHistoryPage = async () => {
  const postData = await readArticle("historia-e-shkolles");
  return <PostView postData={postData} />;
};

export default SchoolHistoryPage;
