"use client";
import { useVideoTexture } from "@react-three/drei";

interface ScreenMaterialProps {
  texture: string;
}

const ScreenMaterial = ({ texture }: ScreenMaterialProps) => {
  const screen = useVideoTexture(texture);
  return <meshBasicMaterial map={screen} />;
};

export default ScreenMaterial;
