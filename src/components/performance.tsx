"use client";

import { performanceImages, performanceImgPositions } from "@/constants/insex";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Performance = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      // Text animation
      gsap.fromTo(
        ".content p",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".content p",
            start: "top bottom",
            end: "top center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      if (isMobile) return;

      // Image position timeLine
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top bottom",
          end: "bottom center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      //  Position each performance Image
      performanceImgPositions.forEach((item) => {
        if (item.id === "p5") return;

        const selector = `.${item.id}`;
        const vars: {
          left?: string;
          right?: string;
          bottom?: string;
          transform?: string | undefined;
        } = {};

        if (typeof item.left === "number") vars.left = `${item.left}%`;
        if (typeof item.right === "number") vars.right = `${item.right}%`;
        if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;

        tl.to(selector, vars, 0);
      });
    },
    { scope: sectionRef, dependencies: [isMobile] },
  );
  return (
    <section id="performance" ref={sectionRef}>
      <h2>Next-level graphics performance. Game on.</h2>

      {/* DESKTOP LAYOUT (GSAP Floating Collage) */}
      <div className="wrapper hidden lg:block">
        {performanceImages.map(({ src, id }, idx) => (
          <Image
            key={idx}
            src={src}
            className={id}
            alt={`Performance image #${idx + 1}`}
            width={454}
            height={305}
          />
        ))}
      </div>
      {/* MOBILE & TABLET LAYOUT (Horizontal Touch Carousel) */}
      <div className="mt-8 block w-full max-w-full lg:hidden">
        {/* Featured Hero Image (p5) */}
        <div className="mx-auto mb-6 max-w-xl px-4 sm:max-w-3xl">
          <Image
            src="/performance5.jpg"
            alt="Featured performance"
            width={900}
            height={600}
            quality={90}
            className="pointer-events-none h-auto max-h-87.5 w-full rounded-2xl border border-neutral-800/60 object-cover shadow-xl select-none"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        </div>
        {/* Scroll-Snap Horizontal Gallery */}
        <div className="no-scrollbar flex cursor-grab touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-6 active:cursor-grabbing">
          {performanceImages
            .filter((item) => item.id !== "p5")
            .map(({ src, id }, idx) => (
              <div key={id} className="w-70 shrink-0 snap-center sm:w-85">
                <Image
                  src={src}
                  alt={`Performance screenshot #${idx + 1}`}
                  width={340}
                  height={220}
                  className="h-auto w-full rounded-xl border border-neutral-800 object-cover"
                />
              </div>
            ))}
        </div>
      </div>

      <div className="content">
        <p>
          Run graphics-intensive workflows with a responsiveness that keeps up
          with your imagination. The M4 family of chips features a GPU with a
          second-generation hardware-accelerated ray tracing engine that renders
          images faster, so{" "}
          <span className="text-white">
            gaming feels more immersive and realistic than ever.
          </span>{" "}
          And Dynamic Caching optimizes fast on-chip memory to dramatically
          increase average GPU utilization — driving a huge performance boost
          for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  );
};

export default Performance;
