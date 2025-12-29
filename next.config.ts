import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: '/intelligence',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
