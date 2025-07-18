import { Size } from "@/global/enums";
import * as book from "../../book/action";
import { MetadataRoute } from "next";

export async function getTotalBook() {
  const totalBooks = await book.countBooks();
  const totalSitemaps = Math.ceil(totalBooks / Size.FiftyK);
  return totalSitemaps;
}

export async function getBookUrls(id: number): Promise<MetadataRoute.Sitemap> {
  const booksPage = await book.getBooks({
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
