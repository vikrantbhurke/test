import { checkBookLiker } from "@/features/book-liker/action";

type CheckBookLikerProps = {
  bookId: string;
  likerId: string;
  children: (exists: boolean) => React.ReactNode;
};

export default async function CheckBookLiker({
  bookId,
  likerId,
  children,
}: CheckBookLikerProps) {
  const response = await checkBookLiker({
    bookId,
    likerId,
  });

  if (!response || !response.success) null;
  return children(response.exists);
}
