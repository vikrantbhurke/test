"use client";
import useSWR from "swr";
import { checkBookLiker } from "@/features/book-liker/action";

type CheckBookLikerProps = {
  bookId: string;
  likerId: string;
  children: (exists: boolean) => React.ReactNode;
};

export default function CheckBookLiker({
  bookId,
  likerId,
  children,
}: CheckBookLikerProps) {
  const { data: response } = useSWR({ bookId, likerId }, checkBookLiker);
  if (!response || !response.success) return null;
  return children(response.exists);
}
