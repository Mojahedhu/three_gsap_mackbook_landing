import { ThreeElements } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial, Scene } from "three";
// type definition for GLTF loader result
type GLTFResult = {
  nodes: Record<string, Mesh>;
  materials: Record<string, MeshStandardMaterial>;
  scene: Scene;
};

type GroupProps = ThreeElements["group"];

export type { GLTFResult, GroupProps };
