import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: "all",
      maxSize: 200000,
    };

    return config;
  },
};

export default nextConfig;
