import { notFound } from "next/navigation";
import { getComments } from "../action";

type GetCommentsByBookIdProps = {
  params: Promise<{ id: string; page: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
  children: (book: any) => React.ReactNode;
};

export default async function GetCommentsByBookId({
  params,
  searchParams,
  children,
}: GetCommentsByBookIdProps) {
  const { id, page } = await params;
  const sp = await searchParams;
  const dbPage = Number(page) - 1;

  const response = await getComments({
    page: dbPage,
    filter: { bookId: id },
    ...sp,
  });

  if (!response.success) return notFound();
  return children(response.data);
}
