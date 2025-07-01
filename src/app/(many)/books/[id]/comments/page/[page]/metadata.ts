import { getBookById } from "@/features";
import type { Metadata } from "next";

type generateMetadataParams = {
  params: Promise<{ id: string; page: string }>;
};

export async function generateMetadata({
  params,
}: generateMetadataParams): Promise<Metadata> {
  const { id, page } = await params;
  const book = await getBookById(id);

  const { title, authorId } = book;
  const baseUrl = process.env.APP_URL;
  const fullName = authorId ? `${authorId.firstname} ${authorId.lastname}` : "";
  const baseTitle = `${title} by ${fullName}`;
  const pageTitle = `Comments on ${baseTitle} – Page ${page} | Bookverse`;

  return {
    title: pageTitle,
    description: `Read user reviews and comments on "${baseTitle}", page ${page}.`,
    openGraph: {
      title: pageTitle,
      description: `User opinions and discussion on "${title}".`,
      images: [],
      url: `${baseUrl}/books/${id}/comments/page/${page}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: `See what readers are saying about "${title}"`,
      images: [],
    },
    alternates: {
      canonical: `${baseUrl}/books/${id}/comments/page/${page}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
