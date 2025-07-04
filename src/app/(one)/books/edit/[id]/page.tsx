import { Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { getAuth, getBookById } from "@/features";
import { notFound, redirect } from "next/navigation";
import { signInRoute } from "@/global/constants/routes";
import { EditBookForm } from "@/features/book/views/client";
export { metadata } from "./metadata";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id: uid, role } = await getAuth();
  const { id } = await params;
  const book = await getBookById(id, { id: uid, role });
  if (!book) return notFound();
  if (book.authorId.id !== uid) redirect(signInRoute);

  return (
    <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
      <EditBookForm book={book} />
    </Stack>
  );
}
