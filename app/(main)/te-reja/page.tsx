"use client";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { GLTFLoader } from "three-stdlib";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import SpotlightFX from "@/components/fx/SpotlightFX";

const TitleModel = () => {
  const { scene } = useLoader(GLTFLoader, "/assets/title.glb");
  return <primitive object={scene} />;
};
const Page = () => {
  return (
    <main className={"flex flex-col"}>
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
              {/*<SpotLight*/}
              {/*  color="#00d9ff"*/}
              {/*  position={[-2, 1.5, 0]}*/}
              {/*  intensity={10}*/}
              {/*  angle={Math.PI / 10}*/}
              {/*  penumbra={0}*/}
              {/*  castShadow*/}
              {/*/>*/}
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
