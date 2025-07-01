import connectCloudinary from "@/global/configurations/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { public_id } = await request.json();

  if (!public_id)
    return NextResponse.json({ message: "Missing public_id" }, { status: 400 });

  try {
    const cloudinary = await connectCloudinary();
    const result = await cloudinary.uploader.destroy(public_id);
    return NextResponse.json({ message: "Deleted from Cloudinary", result });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete", error },
      { status: 500 }
    );
  }
}
