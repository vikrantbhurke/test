import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
  },
  experimental: {
    optimizePackageImports: [
      "@emotion/react",
      "@emotion/styled",
      "@heroicons/react",
      "@mantine/core",
      "@mantine/form",
      "@mantine/hooks",
      "@mantine/modals",
      "@mantine/nprogress",
      "@mui/material",
      "@radix-ui/react-icons",
      "@reduxjs/toolkit",
      "@remixicon/react",
      "@tabler/icons-react",
      "axios",
      "bcryptjs",
      "cloudinary",
      "dotenv",
      "handlebars",
      "jose",
      "jsonwebtoken",
      "lucide-react",
      "mailtrap",
      "mantine-form-zod-resolver",
      "mongoose",
      "next",
      "next-auth",
      "next-cloudinary",
      "nodemailer",
      "react",
      "react-dom",
      "react-feather",
      "react-icons",
      "react-redux",
      "react-virtualized-auto-sizer",
      "react-window",
      "stripe",
      "swr",
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
