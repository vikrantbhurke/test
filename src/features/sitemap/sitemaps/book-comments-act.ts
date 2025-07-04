import { Size, Type } from "@/global/enums";
import { MetadataRoute } from "next";
import * as comment from "../../comment/action";
import * as book from "../../book/action";

let cachedData: {
  urls: any[];
  totalSitemaps: number;
} | null = null;

export async function getTotal() {
  const { totalSitemaps } = await getData();
  return totalSitemaps;
}

export async function getUrls(id: number): Promise<MetadataRoute.Sitemap> {
  const { urls } = await getData();
  const start = id * Size.FiftyK;
  const end = Math.min(start + Size.FiftyK, urls.length);
  return urls.slice(start, end);
}

export async function getData() {
  if (cachedData) return cachedData;

  const booksPage = await book.getBooks({
    select: "_id",
    populate: [],
    type: Type.All,
  });

  const urls: any = [];

  for (const book of booksPage.content) {
    const totalComments = await comment.countComments({ bookId: book.id });
    const totalCommentPages = Math.ceil(totalComments / Size.Thirty);

    for (let page = 1; page <= totalCommentPages; page++) {
      urls.push({
        url: `${process.env.APP_URL}/books/${book.id}/comments/page/${page}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  const totalSitemaps = Math.ceil(urls.length / Size.FiftyK);
  cachedData = { urls, totalSitemaps };
  return cachedData;
}
