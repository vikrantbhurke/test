"use server";
import path from "path";
import * as repo from "./repository";
import { promises as fs } from "fs";
import * as bookSitemap from "./sitemaps/book";
import * as booksSitemap from "./sitemaps/books";
import * as staticSitemap from "./sitemaps/static";
import * as bookCommentsSitemap from "./sitemaps/book-comments";
import connectCloudflare from "@/global/configurations/cloudflare";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function createSitemaps() {
  const smurl = process.env.R2_PUBLIC_URL!; // process.env.APP_URL as string; Use R2_PUBLIC_URL for Cloudflare R2 and APP_URL for local persistence
  const sitemapUrls: string[] = [];

  const urls = staticSitemap.getUrls();
  const xml = await buildSitemap(urls);
  const fileName = "sitemaps/static/sitemap.xml";
  await uploadSitemap(fileName, xml);
  // await saveSitemap(fileName, xml);
  sitemapUrls.push(`${smurl}/${fileName}`);

  for (let i = 0; i < (await bookSitemap.getTotal()); i++) {
    const urls = await bookSitemap.getUrls(i);
    const xml = await buildSitemap(urls);
    const fileName = `sitemaps/book/book-${i}.xml`;
    await uploadSitemap(fileName, xml);
    // await saveSitemap(fileName, xml);
    sitemapUrls.push(`${smurl}/${fileName}`);
  }

  for (let i = 0; i < (await booksSitemap.getTotal()); i++) {
    const urls = await booksSitemap.getUrls(i);
    const xml = await buildSitemap(urls);
    const fileName = `sitemaps/books/books-${i}.xml`;
    await uploadSitemap(fileName, xml);
    // await saveSitemap(fileName, xml);
    sitemapUrls.push(`${smurl}/${fileName}`);
  }

  for (let i = 0; i < (await bookCommentsSitemap.getTotal()); i++) {
    const urls = await bookCommentsSitemap.getUrls(i);
    const xml = await buildSitemap(urls);
    const fileName = `sitemaps/book-comments/book-comments-${i}.xml`;
    await uploadSitemap(fileName, xml);
    // await saveSitemap(fileName, xml);
    sitemapUrls.push(`${smurl}/${fileName}`);
  }

  const indexXml = await buildIndexSitemap(sitemapUrls);
  await uploadSitemap("sitemap_index.xml", indexXml);
  // await saveSitemap("sitemap_index.xml", indexXml);
}

export async function buildSitemap(urls: any[]): Promise<string> {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (entry) => `<url>
          <loc>${entry.url}</loc>
          <lastmod>${entry.lastModified}</lastmod>
          <changefreq>${entry.changeFrequency}</changefreq>
          <priority>${entry.priority}</priority>
        </url>`
      )
      .join("")}
  </urlset>`;
}

export async function buildIndexSitemap(
  sitemapUrls: string[]
): Promise<string> {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapUrls
      .map(
        (url) => `<sitemap>
          <loc>${url}</loc>
        </sitemap>`
      )
      .join("")}
  </sitemapindex>`;
}

export async function saveSitemap(fileName: string, xml: string) {
  const filePath = path.join(process.cwd(), "public", fileName);
  const directory = path.dirname(filePath);
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(filePath, xml, "utf8");
}

export async function uploadSitemap(fileName: string, xml: string) {
  try {
    const r2 = await connectCloudflare();
    if (!r2) throw new Error("⛔ Failed to connect to Cloudflare R2");

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: fileName,
      Body: xml,
      ContentType: "application/xml",
      CacheControl: "public, max-age=86400", // Optional: cache for 1 day
    });

    await r2.send(command);
  } catch (error: any) {
    console.error("Upload failed:", error);
    throw error;
  }
}

export async function getSitemap(conditions: any) {
  try {
    return await repo.getSitemap(conditions);
  } catch (error: any) {
    throw error;
  }
}

export async function setSitemap(filter: any, update: any) {
  try {
    await repo.setSitemap(filter, update);
  } catch (error: any) {
    throw error;
  }
}
