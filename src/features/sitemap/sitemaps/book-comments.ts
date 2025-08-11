import { MetadataRoute } from "next";
import { Size } from "@/global/enums";
import * as book from "../../book/action";
import * as comment from "../../comment/action";

export async function getTotalBookComments() {
  const totalBooks = await book.countBooks();
  const totalSitemaps = Math.ceil(totalBooks / Size.FiftyK);
  return totalSitemaps;
}

export async function getBookCommentsUrls(
  id: number
): Promise<MetadataRoute.Sitemap> {
  const booksPage = await book.getBooks({
    page: id,
    select: "_id",
    size: Size.FiftyK,
    populate: [],
  });

  const booksWithComments = await Promise.all(
    booksPage.content.map(async (book: any) => {
      const totalComments = await comment.countComments({ bookId: book.id });
      return totalComments > 0 ? book : null;
    })
  );

  return booksWithComments
    .filter((book) => book !== null)
    .map((book: any) => ({
      url: `${process.env.APP_URL}/books/${book.id}/comments`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
}
