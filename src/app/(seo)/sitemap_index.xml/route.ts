import { NextResponse } from "next/server";

// This API Route is need if you are using Cloudflare R2 to serve your sitemaps.
// If you are saving your sitemaps to /public/sitemaps, you can remove this API route.

export async function GET() {
  try {
    const r2Url = `${process.env.R2_PUBLIC_URL}/sitemap_index.xml`;
    const response = await fetch(r2Url);
    if (!response.ok) throw new Error("Failed to fetch sitemap index");
    const xml = await response.text();
    return new NextResponse(xml, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (err) {
    console.error("Failed to serve sitemap index:", err);
    return NextResponse.error();
  }
}
