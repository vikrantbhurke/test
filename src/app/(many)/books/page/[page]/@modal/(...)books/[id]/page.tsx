import { BookItem } from "@/features/book/views";
import { GetBookById } from "@/features/book/queries";
import ModalClient from "./modal-client";
import { Stack } from "@mantine/core";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: PageProps) {
  return (
    <ModalClient>
      <Stack p="xs" pt={0} bg="var(--bg-one)">
        <GetBookById params={params}>
          {(book) => <BookItem book={book} />}
        </GetBookById>
      </Stack>
    </ModalClient>
  );
}
