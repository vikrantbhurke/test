import { Size, Type } from "@/global/enums";
import type { MetadataRoute } from "next";
import { countComments, getBooks } from "@/features";

export class BookCommentsSitemap {
  cachedData: {
    urls: any[];
    totalSitemaps: number;
  } | null = null;

  async getTotal() {
    const { totalSitemaps } = await this.getData();
    return totalSitemaps;
  }

  async getUrls(id: number): Promise<MetadataRoute.Sitemap> {
    const { urls } = await this.getData();
    const start = id * Size.FiftyK;
    const end = Math.min(start + Size.FiftyK, urls.length);
    return urls.slice(start, end);
  }

  async getData() {
    if (this.cachedData) return this.cachedData;

    const booksPage = await getBooks({
      select: "_id",
      populate: [],
      type: Type.All,
    });

    const urls: any = [];

    for (const book of booksPage.content) {
      const totalComments = await countComments({ bookId: book.id });
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
    this.cachedData = { urls, totalSitemaps };
    return this.cachedData;
  }
}
