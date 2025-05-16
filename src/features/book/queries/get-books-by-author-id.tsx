import { notFound } from "next/navigation";
import { getBooks } from "../action";

type GetBooksByAuthorIdProps = {
  params: Promise<{ id: string; page: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
  children: (book: any) => React.ReactNode;
};

export default async function GetBooksByAuthorId({
  params,
  searchParams,
  children,
}: GetBooksByAuthorIdProps) {
  const { id, page } = await params;
  const sp = await searchParams;
  const dbPage = Number(page) - 1;

  const response = await getBooks({
    ...sp,
    page: dbPage,
    filter: { authorId: id },
  });

  if (!response.success) return notFound();
  return children(response.data);
}
