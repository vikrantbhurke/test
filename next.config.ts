import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
  },
  experimental: {
    optimizePackageImports: [
      "zod",
      "react",
      "validator",
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/form",
      "@mantine/hooks",
      "@mantine/modals",
      "@mantine/notifications",
      "@mantine/nprogress",
    ],
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
