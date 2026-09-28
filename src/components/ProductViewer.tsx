"use client";

import { useIsMounted } from "@/hooks/useIsMounted";
import { useMacbookStore } from "@/store/store-provider";
import { Canvas } from "@react-three/fiber";
import { clsx } from "clsx";
import StudioLights from "./three/StudioLights";
import ModelSwitcher from "./three/ModelSwitcher";
import { useMediaQuery } from "react-responsive";

const ProductViewer = () => {
  const isMounted = useIsMounted();
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const color = useMacbookStore((state) => state.color);
  const scale = useMacbookStore((state) => state.scale);

  const setScale = useMacbookStore((state) => state.setScale);
  const setColor = useMacbookStore((state) => state.setColor);

  // Avoid redering 3D Canvas until media query and client
  if (!isMounted)
    return (
      <section id="product-viewer" className="h-dvh">
        Loading...
      </section>
    );

  return (
    <section id="product-viewer">
      <h2>Take a closer look.</h2>

      <div className="controls">
        <div className="flex-center mt-6 gap-5">
          <div className="color-control">
            <button
              type="button"
              aria-label="Silver"
              aria-pressed={color === "#adb5bd"}
              onClick={() => setColor("#adb5bd")}
              className={clsx(
                "bg-neutral-300",
                color === "#adb5bd" && "active",
              )}
            />
            <button
              aria-label="Space Grey"
              aria-pressed={color === "#2e2c2e"}
              onClick={() => setColor("#2e2c2e")}
              className={clsx(
                "bg-neutral-900",
                color === "#2e2c2e" && "active",
              )}
            />
          </div>

          <div className="size-control">
            <button
              type="button"
              aria-label="14-inch display"
              aria-pressed={scale === 0.06}
              onClick={() => setScale(0.06)}
              className={clsx(
                scale === 0.06
                  ? "bg-white text-black"
                  : "bg-transparent text-white",
              )}
            >
              <p>14&quot;</p>
            </button>
            <button
              type="button"
              aria-label="16-inch display"
              aria-pressed={scale === 0.08}
              onClick={() => setScale(0.08)}
              className={clsx(
                scale === 0.08
                  ? "bg-white text-black"
                  : "bg-transparent text-white",
              )}
            >
              <p>16&quot;</p>
            </button>
          </div>
        </div>
      </div>

      <Canvas
        id="canvas"
        camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}
      >
        <StudioLights />

        <ModelSwitcher scale={scale} isMobile={isMobile} />
      </Canvas>
    </section>
  );
};

export default ProductViewer;
