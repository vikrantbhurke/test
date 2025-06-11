import cloudinary from "@/global/configurations/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { public_id } = await req.json();

  if (!public_id)
    return NextResponse.json({ message: "Missing public_id" }, { status: 400 });

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return NextResponse.json({ message: "Deleted from Cloudinary", result });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete", error },
      { status: 500 }
    );
  }
}
