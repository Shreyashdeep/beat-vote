import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["i.ytimg.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
