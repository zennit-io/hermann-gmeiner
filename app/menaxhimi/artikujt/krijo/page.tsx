import { Suspense } from "react";
//
import { IconClipboardPlus } from "@tabler/icons-react";
import MDXEditor from "@/components/general/mdx-editor/MDXEditor";
import { ClientOnly } from "@/components/general/ClientOnly";
//

const ManagementPage = () => {
  return (
    <section className={"size-full py-3 pr-6"}>
      <div className={"flex w-full items-center gap-2 pb-1"}>
        <IconClipboardPlus stroke={1.5} />
        <h1 className={"w-full text-4xl font-bold"}>Shto nje artikull të ri</h1>
      </div>
      <hr className={"border-foreground pb-3 "} />
      <Suspense fallback={null}>
        <ClientOnly>
          <MDXEditor markdown={``} />
        </ClientOnly>
      </Suspense>
    </section>
  );
};

export default ManagementPage;
