import { DynamicRouteProps } from "@/types/navigation/DynamicRouteProps";
import { IconClipboardPlus } from "@tabler/icons-react";
import { Suspense } from "react";
import { ClientOnly } from "@/components/general/ClientOnly";
import MDXEditor from "@/components/general/mdx-editor/MDXEditor";
import { getArticle } from "@/db/actions/article/get-article";

const Page = async ({ params }: DynamicRouteProps<"id">) => {
  const projectId = params.id;
  const articleMarkdown = await getArticle(Number(projectId));
  return (
    <section className={"size-full py-3 pr-6"}>
      <div className={"flex w-full items-center gap-2 pb-1"}>
        <IconClipboardPlus stroke={1.5} />
        <h1 className={"w-full text-4xl font-bold"}>
          Ndysho artikullin: {articleMarkdown.title}
        </h1>
      </div>
      <hr className={"border-foreground pb-3 "} />
      <Suspense fallback={null}>
        <ClientOnly>
          <MDXEditor
            markdown={articleMarkdown.content}
            defaultValues={articleMarkdown.data}
          />
        </ClientOnly>
      </Suspense>
    </section>
  );
};

export default Page;
