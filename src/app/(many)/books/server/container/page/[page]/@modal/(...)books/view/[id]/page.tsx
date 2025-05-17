import { Stack } from "@mantine/core";
import { BookItem } from "@/features/book/views";
import { NextModal } from "@/global/components/common";
import { GetBookById } from "@/features/book/queries";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: PageProps) {
  return (
    <NextModal>
      <Stack p="xs" pt={0}>
        <GetBookById params={params}>
          {(book) => <BookItem book={book} />}
        </GetBookById>
      </Stack>
    </NextModal>
  );
}
