import { Suspense } from "react";
//
import dynamic from "next/dynamic";
//

const MDXEditor = dynamic(
  () => import("../../../components/general/mdx-editor/MDXEditor"),
  {
    ssr: false,
  }
);
const ManagementPage = () => {
  return (
    <main className={"size-full"}>
      <Suspense fallback={null}>
        <MDXEditor markdown={``} />
      </Suspense>
    </main>
  );
};

export default ManagementPage;
