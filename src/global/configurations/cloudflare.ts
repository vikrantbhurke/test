"use server";
import { S3Client } from "@aws-sdk/client-s3";

const connectCloudflare = async () => {
  if (
    !process.env.R2_ACCESS_KEY_ID ||
    !process.env.R2_SECRET_ACCESS_KEY ||
    !process.env.R2_ENDPOINT
  ) {
    throw new Error("⛔ Cloudflare R2 environment variables are missing");
  }

  const r2 = new S3Client({
    region: "auto", // Cloudflare R2 uses 'auto' region
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

  console.log("✅ Cloudflare R2 configured");
  return r2;
};

export default connectCloudflare;
