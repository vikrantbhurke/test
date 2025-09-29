import { Stack } from "@mantine/core";
import { Order } from "@/global/enums";
import { notFound } from "next/navigation";
import { getAuth, getBooks } from "@/features";
import { dimensions } from "@/global/constants";
import { listGridDefaults } from "@/global/constants/server";
import { ListGridOuter } from "@/global/components/list-grid/server";
import { BooksItem, BooksDetails } from "@/features/book/views/server";
export { generateMetadata } from "./metadata";

type PageProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { id, role } = await getAuth();
  const { sort, order, genre, page } = await searchParams;
  const dbPage = page ? Number(page) - 1 : 0;
  const auth = { id, role };

  const getBooksDTO = {
    sort,
    page: dbPage,
    order: order as Order,
    filter: !genre || genre === "All" ? undefined : { genre },
  };

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
          ad: true,
          DataItem: BooksItem,
          content: booksPage.content,
        }}
      />
    </Stack>
  );
}
