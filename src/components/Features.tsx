"use client";
import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights";
import { features } from "@/constants/insex";
import clsx from "clsx";
import Image from "next/image";
import ScrollModel from "@/components/models/ModelScroll";

const Features = () => {
  return (
    <section id="features">
      <h2>See it all in a new light.</h2>

      <Canvas id="f-canvas" camera={{}}>
        <StudioLights />
        <ambientLight intensity={0.5} />
        <ScrollModel />
      </Canvas>

      <div className="absolute inset-0">
        {features.map((feature, idx) => (
          <div
            key={feature.id}
            className={clsx("box", `box${idx + 1}`, feature.styles)}
          >
            <Image
              src={feature.icon}
              alt={feature.highlight}
              width={40}
              height={40}
            />
            <p>
              <span className="text-white">{feature.highlight}</span>{" "}
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
