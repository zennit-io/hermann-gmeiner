import { getAllArticles } from "@/db/actions/article/get-all-articles";
import ArticleTable from "@/components/management/ArticleTable";
import { IconClipboardPlus } from "@tabler/icons-react";

const Page = async () => {
  const articles = await getAllArticles({ page: 1, pageSize: 100 });
  return (
    <section className={"size-full py-3 pr-6"}>
      <div className={"flex w-full items-center gap-2 pb-1"}>
        <IconClipboardPlus stroke={1.5} />
        <h1 className={"w-full text-4xl font-bold"}>Të gjithë artikujt:</h1>
      </div>
      <hr className={"border-foreground pb-3 "} />
      <ArticleTable articles={articles} />
    </section>
  );
};

export default Page;
