import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["three"],
  reactCompiler: true,
};

export default nextConfig;
