import {
  CommentsItemServer,
  CommentsDetailsServer,
} from "@/features/comment/views";
import { Paper, Stack } from "@mantine/core";
import { BookItem } from "@/features/book/views";
import { GetBookById } from "@/features/book/queries";
import { dimensions, listGridFiniteDefaults } from "@/global/constants";
import { AddCommentButton } from "@/features/comment/views";
import { ListGridFinite } from "@/global/components/list-grid";
import { GetCommentsByBookId } from "@/features/comment/queries";
import { auth } from "@/auth";

type PageProps = {
  params: Promise<{ id: string; page: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const session = await auth();
  const { id } = await params;

  const {
    paginationProps,
    scrollButtonsProps,
    scrollWrapperProps,
    listGridServerProps,
  } = listGridFiniteDefaults;

  return (
    <Stack h="100%" w="100%" justify="center" maw={dimensions.mawSm}>
      <Stack p="xs">
        <Paper radius="md" p="xl">
          <GetBookById params={params}>
            {(book) => <BookItem book={book} />}
          </GetBookById>
        </Paper>

        <AddCommentButton bookId={id} session={session} />
      </Stack>

      <GetCommentsByBookId params={params} searchParams={searchParams}>
        {(commentsPage) => (
          <>
            {commentsPage.content.length === 0 ? (
              <></>
            ) : (
              <ListGridFinite
                dataPage={commentsPage}
                DataDetailsServer={CommentsDetailsServer}
                paginationProps={{
                  ...paginationProps,
                  value: commentsPage.page + 1,
                  total: commentsPage.totalPages,
                }}
                scrollButtonsProps={scrollButtonsProps}
                scrollWrapperProps={scrollWrapperProps}
                listGridServerProps={{
                  ...listGridServerProps,
                  content: commentsPage.content,
                  DataItemServer: CommentsItemServer,
                  listGridProps: {
                    ...listGridServerProps.listGridProps,
                    layout: "list",
                  },
                }}
              />
            )}
          </>
        )}
      </GetCommentsByBookId>
    </Stack>
  );
}
