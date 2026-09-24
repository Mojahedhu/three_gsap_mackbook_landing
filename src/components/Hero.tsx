"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2;
    }
  }, []);
  return (
    <section id="hero">
      <div>
        <h1>MacBook Pro</h1>
        <Image
          src={"/title.png"}
          width={1397}
          height={249}
          alt="MacBook title"
        />
      </div>

      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        autoPlay
        muted
        playsInline
      ></video>

      <button>Buy</button>
      <p>From $1599 or $133/mo for 12months</p>
    </section>
  );
};

export default Hero;
