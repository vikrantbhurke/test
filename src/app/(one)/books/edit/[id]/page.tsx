import { Stack } from "@mantine/core";
import { notFound, redirect } from "next/navigation";
import { dimensions } from "@/global/constants";
import { getBookById } from "@/features/book/action";
import { EditBookForm } from "@/features/book/views/client";
import { getAuth } from "@/features/user/action";
import { signInRoute } from "@/global/constants/routes";

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
