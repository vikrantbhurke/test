import { Size } from "@/global/enums";
import type { MetadataRoute } from "next";
import { countBooks } from "@/features";

export class BooksSitemap {
  totalBookPages: number | null = null;

  async getTotalBookPages() {
    if (this.totalBookPages !== null) return this.totalBookPages;
    const totalBooks = await countBooks();
    this.totalBookPages = Math.ceil(totalBooks / Size.Thirty);
    return this.totalBookPages;
  }

  async getTotal() {
    const totalBookPages = await this.getTotalBookPages();
    const totalSitemaps = Math.ceil(totalBookPages / Size.FiftyK);
    return totalSitemaps;
  }

  async getUrls(id: number): Promise<MetadataRoute.Sitemap> {
    const totalBookPages = await this.getTotalBookPages();

    const urls: any[] = [];
    const startPage = id * Size.FiftyK + 1;
    const endPage = Math.min(startPage + Size.FiftyK - 1, totalBookPages);

    for (let i = startPage; i <= endPage; i++) {
      urls.push({
        url: `${process.env.APP_URL}/books/server/window/page/${i}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    return urls;
  }
}
