import { Paper, Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { GetBookById } from "@/features/book/queries";
import { BookItem } from "@/features/book/views/server";
import { listGridDefaults } from "@/global/constants/server";
import { GetCommentsByBookId } from "@/features/comment/queries";
import { AddCommentButton } from "@/features/comment/views/client";
import { ListGridOuter } from "@/global/components/list-grid/server";
import { CommentsItem, CommentsDetails } from "@/features/comment/views/server";
import { GetSession } from "@/features/user/queries/server";

type PageProps = {
  params: Promise<{ id: string; page: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;

  const {
    paginationProps,
    scrollButtonsProps,
    scrollWrapperProps,
    listGridInnerProps,
  } = listGridDefaults;

  return (
    <Stack h="100%" w="100%" justify="center" maw={dimensions.mawSm}>
      <GetSession>
        {(session) => (
          <>
            <Stack p="xs">
              <Paper radius="md" p="xl">
                <GetBookById params={params}>
                  {(book) => (
                    <BookItem
                      book={book}
                      sessionUser={{
                        id: session?.user.id,
                        role: session?.user.role,
                      }}
                    />
                  )}
                </GetBookById>
              </Paper>

              <AddCommentButton
                bookId={id}
                sessionUser={{
                  role: session?.user.role,
                }}
              />
            </Stack>

            <GetCommentsByBookId params={params} searchParams={searchParams}>
              {(commentsPage) => (
                <>
                  {commentsPage.content.length === 0 ? (
                    <></>
                  ) : (
                    <ListGridOuter
                      dataPage={commentsPage}
                      DataDetails={CommentsDetails}
                      paginationProps={{
                        ...paginationProps,
                        value: commentsPage.page + 1,
                        total: commentsPage.totalPages,
                      }}
                      scrollButtonsProps={scrollButtonsProps}
                      scrollWrapperProps={scrollWrapperProps}
                      listGridInnerProps={{
                        ...listGridInnerProps,
                        sessionUser: { id: session?.user.id },
                        content: commentsPage.content,
                        DataItem: CommentsItem,
                        listGridProps: {
                          ...listGridInnerProps.listGridProps,
                          layout: "list",
                        },
                      }}
                    />
                  )}
                </>
              )}
            </GetCommentsByBookId>
          </>
        )}
      </GetSession>
    </Stack>
  );
}
