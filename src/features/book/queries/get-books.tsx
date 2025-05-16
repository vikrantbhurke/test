import { notFound } from "next/navigation";
import { getBooks } from "../action";

type GetBooksProps = {
  params: Promise<{ page: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
  children: (book: any) => React.ReactNode;
};

export default async function GetBooks({
  params,
  searchParams,
  children,
}: GetBooksProps) {
  const { page } = await params;
  const sp = await searchParams;
  const dbPage = Number(page) - 1;

  const response = await getBooks({
    ...sp,
    page: dbPage,
    filter: sp?.genre === "All" ? {} : { genre: sp?.genre },
  });

  if (!response.success) return notFound();
  return children(response.data);
}
