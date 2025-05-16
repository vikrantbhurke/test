import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
    };
    config.experiments.layers = true;
    return config;
  },
};

export default nextConfig;
