"use server";
import {
  BookSitemap,
  BooksSitemap,
  StaticSitemap,
  BookCommentsSitemap,
} from "./sitemaps";
import path from "path";
import { promises as fs } from "fs";
import { sitemapService } from "..";

export const createSitemaps = async () => {
  const appUrl = process.env.APP_URL as string;
  const sitemapUrls: string[] = [];

  console.log("Creating sitemaps...");
  const staticSitemap = new StaticSitemap();
  const urls = staticSitemap.getUrls();
  const xml = await buildSitemap(urls);
  const fileName = "sitemaps/static/sitemap.xml";
  await saveSitemap(fileName, xml);
  sitemapUrls.push(`${appUrl}/${fileName}`);
  console.log("Static sitemap created:", fileName);

  console.log("Creating book sitemaps...");
  const bookSitemap = new BookSitemap();
  for (let i = 0; i < (await bookSitemap.getTotal()); i++) {
    const urls = await bookSitemap.getUrls(i);
    const xml = await buildSitemap(urls);
    const fileName = `sitemaps/book/book-${i}.xml`;
    await saveSitemap(fileName, xml);
    sitemapUrls.push(`${appUrl}/${fileName}`);
  }
  console.log("Book sitemaps created");

  console.log("Creating books sitemaps...");
  const booksSitemap = new BooksSitemap();
  for (let i = 0; i < (await booksSitemap.getTotal()); i++) {
    const urls = await booksSitemap.getUrls(i);
    const xml = await buildSitemap(urls);
    const fileName = `sitemaps/books/books-${i}.xml`;
    await saveSitemap(fileName, xml);
    sitemapUrls.push(`${appUrl}/${fileName}`);
  }
  console.log("Books sitemaps created");

  console.log("Creating book comments sitemaps...");
  const bookCommentsSitemap = new BookCommentsSitemap();
  for (let i = 0; i < (await bookCommentsSitemap.getTotal()); i++) {
    const urls = await bookCommentsSitemap.getUrls(i);
    const xml = await buildSitemap(urls);
    const fileName = `sitemaps/book-comments/book-comments-${i}.xml`;
    await saveSitemap(fileName, xml);
    sitemapUrls.push(`${appUrl}/${fileName}`);
  }
  console.log("Book comments sitemaps created");

  console.log("Creating index sitemap...");
  const indexXml = await buildIndexSitemap(sitemapUrls);
  await saveSitemap("sitemap_index.xml", indexXml);
  console.log("Index sitemap created");
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
