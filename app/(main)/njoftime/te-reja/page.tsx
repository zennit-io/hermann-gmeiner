"use client";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { GLTFLoader } from "three-stdlib";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import SpotlightFX from "@/components/fx/SpotlightFX";
import ArticlePreview from "@/components/home/ArticlePreview";

const TitleModel = () => {
  const { scene } = useLoader(GLTFLoader, "/assets/title.glb");
  return <primitive object={scene} />;
};
const Page = () => {
  return (
    <main className={"flex flex-col"}>
      <section
        className={"flex flex-wrap gap-2 *:w-[calc((100%/4)-theme(spacing.2))]"}
      >
        {DATA.map((data, i) => (
          <ArticlePreview {...data} key={i} />
        ))}
      </section>
      <section
        className={
          "m-auto flex aspect-video w-[calc(4/5*100dvw)] items-center justify-center overflow-hidden"
        }
      >
        <div className={"aspect-square w-screen"}>
          <SpotlightFX className={"-top-40 left-0 md:-top-20 md:left-60"} />
          <Canvas>
            <Suspense fallback={null}>
              <TitleModel />
              <directionalLight position={[0, 0, 1]} intensity={5} />
              <OrbitControls />
              <PerspectiveCamera
                makeDefault
                manual
                position={[0, 0, 5]}
                aspect={1}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>
      <Footer />
    </main>
  );
};
const DATA = Array.from({ length: 100 }, () => ({
  title: "Test Article",
  tagList: ["Test"],
  length: "5 min read",
  description:
    "some long description about some thing here were testing so it doesent matter some long description about some thing here were testing so it doesent matter some long description about some thing here were testing so it doesent matter some long description about some thing here were testing so it doesent matter",
}));

export default Page;

const Footer = () => {
  return (
    <footer
      className={
        "relative -mt-48 flex min-h-64 w-full items-center rounded-t-xl border border-foreground/25 bg-transparent shadow-xl backdrop-blur-2xl"
      }
    >
      <span className={"text-foreground"}>Hello</span>
    </footer>
  );
};
