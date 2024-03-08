import { Suspense } from "react";
//
import dynamic from "next/dynamic";
//

const MDXEditor = dynamic(
  () => import("../../../components/general/MDXEditor"),
  {
    ssr: false,
  }
);
const ManagementPage = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <MDXEditor markdown={`##Hello`} />
      </Suspense>
    </div>
  );
};

export default ManagementPage;
