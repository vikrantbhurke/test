import { Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { EditBookForm } from "@/features/book/views/client";
import { GetBookById } from "@/features/book/queries";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  return (
    <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
      <GetBookById params={params}>
        {(book) => <EditBookForm book={book} />}
      </GetBookById>
    </Stack>
  );
}
