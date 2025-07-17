import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
  },
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/form",
      "@mantine/hooks",
      "@mantine/modals",
      "@mantine/nprogress",
      "@mui/material",
      "@reduxjs/toolkit",
      "@tabler/icons-react",
      "axios",
      "bcryptjs",
      "cloudinary",
      "handlebars",
      "jsonwebtoken",
      "mailtrap",
      "mantine-form-zod-resolver",
      "mongoose",
      "next",
      "next-auth",
      "next-cloudinary",
      "nodemailer",
      "react",
      "react-dom",
      "react-redux",
      "react-window",
      "stripe",
      "use-debounce",
      "validator",
      "zod",
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
