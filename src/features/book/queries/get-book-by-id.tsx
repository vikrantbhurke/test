import { notFound } from "next/navigation";
import { getBookById } from "../action";

type GetBookByIdProps = {
  params: Promise<{ id: string }>;
  children: (book: any) => React.ReactNode;
};

export default async function GetBookById({
  params,
  children,
}: GetBookByIdProps) {
  const { id } = await params;
  const response = await getBookById(id);
  if (!response.success) return notFound();
  return children(response.data);
}
