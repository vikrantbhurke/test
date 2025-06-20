import { Stack } from "@mantine/core";
import { BookItem } from "@/features/book/views/server";
import { NextModal } from "@/global/components/common/client";
import { getBookById } from "@/features/book/action";
import { notFound } from "next/navigation";
import { getAuth } from "@/features/user/action";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id: uid, role } = await getAuth();
  const { id } = await params;
  const auth = { id: uid, role };
  const book = await getBookById(id, auth);
  if (!book) return notFound();

  return (
    <NextModal>
      <Stack p="xs" pt={0}>
        <BookItem book={book} auth={auth} />
      </Stack>
    </NextModal>
  );
}
