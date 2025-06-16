import { Stack } from "@mantine/core";
import { BookItem } from "@/features/book/views/server";
import { NextModal } from "@/global/components/common/client";
import { GetBookById } from "@/features/book/queries";
import { GetSession } from "@/features/user/queries/server";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: PageProps) {
  return (
    <NextModal>
      <Stack p="xs" pt={0}>
        <GetSession>
          {(session) => (
            <GetBookById params={params}>
              {(book) => <BookItem book={book} session={session} />}
            </GetBookById>
          )}
        </GetSession>
      </Stack>
    </NextModal>
  );
}
