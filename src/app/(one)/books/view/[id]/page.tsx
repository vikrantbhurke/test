import { Paper, Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { BookItem } from "@/features/book/views/server";
import { GetBookById } from "@/features/book/queries";
import { GetSession } from "@/features/user/queries/server";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  return (
    <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
      <Paper p="xl">
        <GetSession>
          {(session) => (
            <GetBookById params={params}>
              {(book) => <BookItem book={book} session={session} />}
            </GetBookById>
          )}
        </GetSession>
      </Paper>
    </Stack>
  );
}
