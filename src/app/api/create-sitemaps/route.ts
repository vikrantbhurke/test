import { createSitemaps } from "@/features";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await createSitemaps();
    const message = "✅ Sitemaps generated successfully";
    console.log(message);

    return NextResponse.json({ message }, { status: 200 });
  } catch (error: any) {
    const message = "⛔ Sitemap generation failed";
    console.error(message, error);
    const { message: details } = error;

    return NextResponse.json({ error, details }, { status: 500 });
  }
}
