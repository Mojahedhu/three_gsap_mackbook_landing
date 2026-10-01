"use client";
import { useVideoTexture } from "@react-three/drei";
import { useEffect } from "react";

interface ScreenMaterialProps {
  texture: string;
}

const ScreenMaterial = ({ texture }: ScreenMaterialProps) => {
  const screen = useVideoTexture(texture, {
    muted: true,
    loop: true,
    start: true,
  });

  useEffect(() => {
    const video = screen.image;
    return () => {
      if (video instanceof HTMLVideoElement) {
        // Only pause if the video is actively playing to avoid interrupting pending play() promises
        if (!video.paused) {
          video.pause();
        }
      }
      screen.dispose();
    };
  }, [screen]);

  return <meshBasicMaterial map={screen} />;
};

export default ScreenMaterial;
