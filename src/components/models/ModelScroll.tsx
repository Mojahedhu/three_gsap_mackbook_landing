"use client";
import { Group } from "three";
import { Suspense, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import { MacbookModel } from "./Macbook";
import { useMediaQuery } from "react-responsive";
import { useMacbookStore } from "@/store/store-provider";
import { featureSequence } from "@/constants/insex";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ModelScroll = () => {
  const groupRef = useRef<Group>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const prefersReducedMotion = useMediaQuery({
    query: "(prefers-reduced-motion)",
  });
  const setTexture = useMacbookStore((select) => select.setTexture);

  // Pre-load all texture videos during component mount

  useEffect(() => {
    featureSequence.forEach((feature) => {
      const v = document.createElement("video");

      Object.assign(v, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: "auto",
        crossOrigin: "anonymous",
      });
      v.load();
    });
  }, []);

  useGSAP(() => {
    if (prefersReducedMotion) {
      gsap.set(".box1,.box2,.box3,.box4,.box5", { opacity: 1, y: 0 });
      return;
    }

    // 3D MODEL ROTATION animation
    const modelTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
      },
    });

    // SYNC THE FEATURE content
    const timeLine = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top center",
        end: "bottom top",
        scrub: 1,
      },
    });

    //  3D SPIN
    if (groupRef.current) {
      modelTimeLine.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        ease: "power1.out",
      });
    }

    // Helper to update texture based on scroll direction when crossing checkpoints
    const syncTexture = (forwardTexture: string, backwardTexture: string) => {
      const isReversing = timeLine.scrollTrigger?.direction === -1;

      // setTexture(isReversing ? backwardTexture : forwardTexture);
      setTexture(forwardTexture);
    };

    // Content & Texture Sync
    timeLine
      .call(() => setTexture("/videos/feature-1.mp4"))
      .to(".box1", { opacity: 1, y: 0, delay: 1 })
      .call(() => syncTexture("/videos/feature-2.mp4", "videos/feature-1.mp4"))
      .to(".box2", { opacity: 1, y: 0 })
      .call(() => syncTexture("/videos/feature-3.mp4", "videos/feature-2.mp4"))
      .to(".box3", { opacity: 1, y: 0 })
      .call(() => syncTexture("/videos/feature-4.mp4", "videos/feature-3.mp4"))
      .to(".box4", { opacity: 1, y: 0 })
      .call(() => syncTexture("/videos/feature-5.mp4", "videos/feature-4.mp4"))
      .to(".box5", { opacity: 1, y: 0 });
  }, []);

  return (
    <group ref={groupRef}>
      <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
    </group>
  );
};

export default ModelScroll;
