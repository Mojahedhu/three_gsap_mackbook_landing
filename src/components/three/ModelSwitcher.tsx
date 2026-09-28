"use client";
import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import MacbookModel14 from "../models/Macbook-14";
import MacbookModel16 from "../models/Macbook-16";
import gsap from "gsap";
interface MadelSwitcherProps {
  scale: number;
  isMobile: boolean;
}
type GroupRef = THREE.Group | null;

const controlConfig = {
  snap: true,
  speed: 1,
  zoom: 1,
  polar: [-Math.PI, Math.PI] as [number, number],
  azimuth: [-Infinity, Infinity] as [number, number],
  config: { mass: 1, tension: 0, friction: 26 },
};

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group: GroupRef, opacity: number, immediate = false) => {
  if (!group) return;
  group.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      //   const materials = Array.isArray(child.material)
      //     ? child.material
      //     : [child.material];

      //   materials.forEach((material) => {
      //     material.transparent = true;

      //     gsap.to(material, { opacity, duration: ANIMATION_DURATION });
      //   });
      child.material.transparent = true;
      if (immediate) {
        gsap.set(child.material, { opacity });
      } else {
        gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
      }
    }
  });
};

const moveGroup = (group: GroupRef, x: number) => {
  if (!group) return;

  gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};

function ModelSwitcher({ scale, isMobile }: MadelSwitcherProps) {
  const largeMacbookRef = useRef<GroupRef>(null);
  const smallMacbookRef = useRef<GroupRef>(null);
  const isFirstRenderRef = useRef<boolean>(true);
  const showLargeMacbook = scale === 0.08;

  useGSAP(() => {
    if (!largeMacbookRef.current || !smallMacbookRef.current) return;

    // Instant placement on initial page load
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      gsap.set(smallMacbookRef.current.position, {
        x: showLargeMacbook ? -OFFSET_DISTANCE : 0,
      });
      gsap.set(largeMacbookRef.current.position, {
        x: showLargeMacbook ? 0 : OFFSET_DISTANCE,
      });
      fadeMeshes(smallMacbookRef.current, showLargeMacbook ? 0 : 1, true);
      fadeMeshes(largeMacbookRef.current, showLargeMacbook ? 1 : 0, true);
      return;
    }

    if (showLargeMacbook) {
      moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
      moveGroup(largeMacbookRef.current, 0);
      fadeMeshes(smallMacbookRef.current, 0);
      fadeMeshes(largeMacbookRef.current, 1);
    } else {
      moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);
      moveGroup(smallMacbookRef.current, 0);
      fadeMeshes(largeMacbookRef.current, 0);
      fadeMeshes(smallMacbookRef.current, 1);
    }
  }, [scale]);

  return (
    <>
      <PresentationControls {...controlConfig}>
        <group ref={largeMacbookRef}>
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>
      <PresentationControls {...controlConfig}>
        <group ref={smallMacbookRef}>
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  );
}

export default ModelSwitcher;
