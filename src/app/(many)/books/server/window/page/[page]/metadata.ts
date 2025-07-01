import type { Metadata } from "next";

type generateMetadataParams = {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: generateMetadataParams): Promise<Metadata> {
  const { page } = await params;
  const baseUrl = process.env.APP_URL;
  const { sort = "title", order = "Asc", genre = "All" } = await searchParams;
  const titleBase = genre === "All" ? "Books" : `${genre} Books`;
  const capitalizedOrder = order === "Asc" ? "Ascending" : "Descending";
  const fullTitle = `${titleBase} – Page ${page} | Sorted by ${sort} (${capitalizedOrder})`;

  return {
    title: fullTitle,
    description: `Browse ${titleBase.toLowerCase()} sorted by ${sort} in ${capitalizedOrder} order on page ${page}.`,
    openGraph: {
      title: fullTitle,
      description: `Explore ${
        genre === "All" ? "a wide range of" : genre
      } books. Page ${page}, sorted by ${sort}.`,
      url: `${baseUrl}/books/server/window/page/${page}?sort=${sort}&order=${order}&genre=${genre}`,
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description: `Explore ${genre} books, sorted by ${sort} (${capitalizedOrder}).`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
