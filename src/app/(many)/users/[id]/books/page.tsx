import { Order } from "@/global/enums";
import { notFound } from "next/navigation";
import { Paper, Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { UserItem } from "@/features/user/views/server";
import { getAuth, getUserById, getBooks } from "@/features";
import { listGridDefaults } from "@/global/constants/server";
import { CollapsibleHeader } from "@/global/components/layouts";
import { ListGridOuter } from "@/global/components/list-grid/server";
import { BooksItem, BooksDetails } from "@/features/book/views/server";
export { generateMetadata } from "./metadata";

export type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { id: uid, role } = await getAuth();
  const { id } = await params;
  const { sort, order, page } = await searchParams;
  const dbPage = page ? Number(page) - 1 : 0;
  const auth = { id: uid, role };

  const getBooksDTO = {
    sort,
    page: dbPage,
    order: order as Order,
    filter: { authorId: id },
  };

  const user = await getUserById(id);
  if (!user) return notFound();

  const booksPage = await getBooks(getBooksDTO, auth);
  if (!booksPage) return notFound();

  const {
    paginationProps,
    scrollButtonsProps,
    scrollWrapperProps,
    listGridInnerProps,
  } = listGridDefaults;

  return (
    <Stack h="100%" w="100%" justify="center" maw={dimensions.mawLg}>
      <Stack p="xs">
        <CollapsibleHeader
          Component={
            <Paper radius={0} p="xl">
              <UserItem user={user} auth={{ id: uid }} />
            </Paper>
          }
        />

        <Paper radius="md" p="xl">
          <UserItem user={user} auth={{ id: uid }} />
        </Paper>
      </Stack>

      <ListGridOuter
        dataPage={booksPage}
        DataDetails={BooksDetails}
        paginationProps={{
          ...paginationProps,
          value: booksPage.page + 1,
          total: booksPage.totalPages,
        }}
        scrollButtonsProps={scrollButtonsProps}
        scrollWrapperProps={scrollWrapperProps}
        listGridInnerProps={{
          ...listGridInnerProps,
          auth,
          content: booksPage.content,
          DataItem: BooksItem,
        }}
      />
    </Stack>
  );
}
