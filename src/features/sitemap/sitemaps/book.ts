import { Size } from "@/global/enums";
import type { MetadataRoute } from "next";
import { countBooks, getBooks } from "@/features";

export class BookSitemap {
  async getTotal() {
    const totalBooks = await countBooks();
    const totalSitemaps = Math.ceil(totalBooks / Size.FiftyK);
    return totalSitemaps;
  }

  async getUrls(id: number): Promise<MetadataRoute.Sitemap> {
    const booksPage = await getBooks({
      page: id,
      select: "_id",
      size: Size.FiftyK,
      populate: [],
    });

    return booksPage.content.map((book: any) => ({
      url: `${process.env.APP_URL}/books/view/${book.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  }
}
