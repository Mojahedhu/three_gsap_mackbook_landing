import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["three"],
  reactCompiler: true,
};

module.exports = {
  images: {
    qualities: [75, 90],
  },
};
export default nextConfig;
