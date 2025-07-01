"use server";
import { v2 as cloudinary } from "cloudinary";

let isConfigured = false;

const connectCloudinary = async () => {
  if (isConfigured) return cloudinary;

  if (
    !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  )
    throw new Error("⛔ Cloudinary environment variables are missing");

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  isConfigured = true;
  console.log("✅ Cloudinary configured");
  return cloudinary;
};

export default connectCloudinary;
