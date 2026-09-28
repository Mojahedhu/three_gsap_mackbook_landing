"use client";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  console.log("register");
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

function GsapProvider({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default GsapProvider;
