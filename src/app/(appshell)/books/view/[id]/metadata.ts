import type { Metadata } from "next";
import { getBookById } from "@/features";

type generateMetadataParams = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: generateMetadataParams): Promise<Metadata> {
  const { id } = await params;
  const book = await getBookById(id);
  const baseUrl = process.env.APP_URL;

  return {
    title: `${book.title} by ${book.authorId.firstname} ${book.authorId.lastname} – Bookverse`,
    description:
      book.description?.slice(0, 160) || "Read book details and user comments.",
    openGraph: {
      title: `${book.title} – Bookverse`,
      description:
        book.description || "View book summary, genre, and comments.",
      images: [],
      url: `${baseUrl}/books/view/${book.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: book.title,
      description: book.description || "Book summary and reviews.",
      images: [],
    },
  };
}
