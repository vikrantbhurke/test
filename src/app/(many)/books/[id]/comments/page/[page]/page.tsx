import { Order } from "@/global/enums";
import { notFound } from "next/navigation";
import { Paper, Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { BookItem } from "@/features/book/views/server";
import { listGridDefaults } from "@/global/constants/server";
import { getAuth, getBookById, getComments } from "@/features";
import { AddCommentButton } from "@/features/comment/views/client";
import { ListGridOuter } from "@/global/components/list-grid/server";
import { CommentsItem, CommentsDetails } from "@/features/comment/views/server";
export { generateMetadata } from "./metadata";

type PageProps = {
  params: Promise<{ id: string; page: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { id: uid, role } = await getAuth();
  const { id, page } = await params;
  const { sort, order } = await searchParams;
  const dbPage = Number(page) - 1;
  const auth = { id: uid, role };

  const getCommentsDTO = {
    sort,
    page: dbPage,
    order: order as Order,
    filter: { bookId: id },
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
            layout: "list",
            auth: { id: uid },
            content: commentsPage.content,
            DataItem: CommentsItem,
          }}
        />
      )}
    </Stack>
  );
}
