import { checkBookLikers } from "@/features/book-liker/action";
import { BookLikerDTO } from "@/features/book-liker/schema";

type CheckBookLikersProps = {
  bookLikers: BookLikerDTO[];
  children: (existsArray: boolean[]) => React.ReactNode;
};

export default async function CheckBookLikers({
  bookLikers,
  children,
}: CheckBookLikersProps) {
  const response = await checkBookLikers(bookLikers);

  if (!response || !response.success) null;
  return children(response.existsArray);
}
