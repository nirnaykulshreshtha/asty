import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // comment our for development
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  images: { unoptimized: true },

};

export default nextConfig;
