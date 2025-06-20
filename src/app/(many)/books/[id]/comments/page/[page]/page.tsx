import { notFound } from "next/navigation";
import { Paper, Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { getAuth } from "@/features/user/action";
import { getBookById } from "@/features/book/action";
import { BookItem } from "@/features/book/views/server";
import { getComments } from "@/features/comment/action";
import { listGridDefaults } from "@/global/constants/server";
import { AddCommentButton } from "@/features/comment/views/client";
import { ListGridOuter } from "@/global/components/list-grid/server";
import { CommentsItem, CommentsDetails } from "@/features/comment/views/server";

type PageProps = {
  params: Promise<{ id: string; page: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { id: uid, role } = await getAuth();
  const { id, page } = await params;
  const sp = await searchParams;
  const dbPage = Number(page) - 1;
  const auth = { id: uid, role };

  const getCommentsDTO = {
    page: dbPage,
    filter: { bookId: id },
    ...sp,
  };

  const book = await getBookById(id, auth);
  if (!book) return notFound();

  const commentsPage = await getComments(getCommentsDTO);
  if (!commentsPage) return notFound();

  const {
    paginationProps,
    scrollButtonsProps,
    scrollWrapperProps,
    listGridInnerProps,
  } = listGridDefaults;

  return (
    <Stack h="100%" w="100%" justify="center" maw={dimensions.mawSm}>
      <Stack p="xs">
        <Paper radius="md" p="xl">
          <BookItem book={book} auth={auth} />
        </Paper>

        <AddCommentButton bookId={book.id} auth={auth} />
      </Stack>

      {commentsPage.content.length !== 0 && (
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
            auth: { id: uid },
            content: commentsPage.content,
            DataItem: CommentsItem,
            listGridProps: {
              ...listGridInnerProps.listGridProps,
              layout: "list",
            },
          }}
        />
      )}
    </Stack>
  );
}
