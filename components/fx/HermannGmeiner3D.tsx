"use client";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import { Suspense } from "react";
import { PerspectiveCamera } from "@react-three/drei";

const TitleModel = () => {
  const { scene } = useLoader(GLTFLoader, "/assets/title.glb");
  return <primitive object={scene} />;
};

export const HermannGmeiner3D = () => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <TitleModel />
        <directionalLight position={[0, 0, 1]} intensity={5} />
        <PerspectiveCamera makeDefault manual position={[0, 0, 5]} aspect={1} />
      </Suspense>
    </Canvas>
  );
};
