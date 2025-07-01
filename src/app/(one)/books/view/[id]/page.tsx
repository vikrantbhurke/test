import { Paper, Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { BookItem } from "@/features/book/views/server";
import { getBookById } from "@/features";
import { notFound } from "next/navigation";
import { getAuth } from "@/features";
export { generateMetadata } from "./metadata";

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
    <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
      <Paper p="xl">
        <BookItem book={book} auth={auth} />
      </Paper>
    </Stack>
  );
}
