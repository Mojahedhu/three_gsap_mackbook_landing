"use client";
import { useVideoTexture } from "@react-three/drei";
import { useEffect } from "react";

interface ScreenMaterialProps {
  texture: string;
}

const ScreenMaterial = ({ texture }: ScreenMaterialProps) => {
  const screen = useVideoTexture(texture);

  useEffect(() => {
    return () => {
      if (screen.image instanceof HTMLVideoElement) {
        screen.image.pause();
      }
      screen.dispose();
    };
  }, [screen]);

  return <meshBasicMaterial map={screen} />;
};

export default ScreenMaterial;
