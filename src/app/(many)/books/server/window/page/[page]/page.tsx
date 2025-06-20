import { Stack } from "@mantine/core";
import { notFound } from "next/navigation";
import { dimensions } from "@/global/constants";
import { getAuth } from "@/features/user/action";
import { getBooks } from "@/features/book/action";
import { listGridDefaults } from "@/global/constants/server";
import { ListGridOuter } from "@/global/components/list-grid/server";
import { BooksItem, BooksDetails } from "@/features/book/views/server";

type PageProps = {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { page } = await params;
  const sp = await searchParams;
  const dbPage = Number(page) - 1;
  const { id, role } = await getAuth();
  const auth = { id, role };

  const getBooksDTO = {
    ...sp,
    page: dbPage,
    filter: sp?.genre === "All" ? {} : { genre: sp?.genre },
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
          content: booksPage.content,
          DataItem: BooksItem,
        }}
      />
    </Stack>
  );
}
