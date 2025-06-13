import { notFound } from "next/navigation";
import { getUserById } from "../../action";

type GetUserByIdProps = {
  params: Promise<{ id: string }>;
  children: (book: any) => React.ReactNode;
};

export default async function GetUserById({
  params,
  children,
}: GetUserByIdProps) {
  const { id } = await params;
  const response = await getUserById(id);
  if (!response || !response.success) return notFound();
  return children(response.data);
}
