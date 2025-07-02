"use server";
import {
  BookSitemap,
  StaticSitemap,
  // BooksSitemap,
  // BookCommentsSitemap,
} from "./sitemaps";
import path from "path";
import { Readable } from "stream";
import { promises as fs } from "fs";
import { sitemapService } from "../di";
import connectCloudflare from "@/global/configurations/cloudflare";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

export const createSitemaps = async () => {
  const smurl = process.env.R2_PUBLIC_URL!; // process.env.APP_URL as string; Use R2_PUBLIC_URL for Cloudflare R2 and APP_URL for local persistence
  const sitemapUrls: string[] = [];

  const staticSitemap = new StaticSitemap();
  const urls = staticSitemap.getUrls();
  const xml = await buildSitemap(urls);
  const fileName = "sitemaps/static/sitemap.xml";
  await uploadSitemap(fileName, xml);
  // await saveSitemap(fileName, xml);
  sitemapUrls.push(`${smurl}/${fileName}`);

  const bookSitemap = new BookSitemap();
  for (let i = 0; i < (await bookSitemap.getTotal()); i++) {
    const urls = await bookSitemap.getUrls(i);
    const xml = await buildSitemap(urls);
    const fileName = `sitemaps/book/book-${i}.xml`;
    await uploadSitemap(fileName, xml);
    // await saveSitemap(fileName, xml);
    sitemapUrls.push(`${smurl}/${fileName}`);
  }

  // const booksSitemap = new BooksSitemap();
  // for (let i = 0; i < (await booksSitemap.getTotal()); i++) {
  //   const urls = await booksSitemap.getUrls(i);
  //   const xml = await buildSitemap(urls);
  //   const fileName = `sitemaps/books/books-${i}.xml`;
  //   await saveSitemap(fileName, xml);
  //   sitemapUrls.push(`${smurl}/${fileName}`);
  // }

  // const bookCommentsSitemap = new BookCommentsSitemap();
  // for (let i = 0; i < (await bookCommentsSitemap.getTotal()); i++) {
  //   const urls = await bookCommentsSitemap.getUrls(i);
  //   const xml = await buildSitemap(urls);
  //   const fileName = `sitemaps/book-comments/book-comments-${i}.xml`;
  //   await saveSitemap(fileName, xml);
  //   sitemapUrls.push(`${smurl}/${fileName}`);
  // }

  const indexXml = await buildIndexSitemap(sitemapUrls);
  await uploadSitemap("sitemap_index.xml", indexXml);
  // await saveSitemap("sitemap_index.xml", indexXml);
};

export const buildSitemap = async (urls: any[]): Promise<string> => {
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
};

export const buildIndexSitemap = async (
  sitemapUrls: string[]
): Promise<string> => {
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
};

export const saveSitemap = async (fileName: string, xml: string) => {
  const filePath = path.join(process.cwd(), "public", fileName);
  const directory = path.dirname(filePath);
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(filePath, xml, "utf8");
};

export const uploadSitemap = async (fileName: string, xml: string) => {
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
};

export const fetchSitemapIndex = async () => {
  try {
    const r2 = await connectCloudflare();
    if (!r2) throw new Error("⛔ Failed to connect to Cloudflare R2");

    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: "sitemap_index.xml",
    });

    const data = await r2.send(command);
    const body = data.Body as Readable;
    let xml = "";
    for await (const chunk of body) xml += chunk;
    return xml;
  } catch (error: any) {
    console.error("Failed to fetch sitemap index:", error);
    throw error;
  }
};

// Getter and setter needed when using diff based sitemap generation
export const getSitemap = async (conditions: any) => {
  try {
    return await sitemapService.getSitemap(conditions);
  } catch (error: any) {
    throw error;
  }
};

export const setSitemap = async (filter: any, update: any) => {
  try {
    await sitemapService.setSitemap(filter, update);
  } catch (error: any) {
    throw error;
  }
};
