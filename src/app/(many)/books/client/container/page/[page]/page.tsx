import { ListGridInfinite } from "@/global/components/list-grid";
import { GetBooks } from "@/features/book/queries";
// import { ListGridFinite } from "@/global/components/list-grid";
import {
  BooksItemClient,
  BooksDetailsClient,
  // BooksItemServer,
  // BooksDetailsServer,
} from "@/features/book/views";
import {
  dimensions,
  // listGridFiniteDefaults,
  listGridInfiniteDefaults,
} from "@/global/constants";
import { Stack } from "@mantine/core";
import { getBooks } from "@/features/book/action";

type PageProps = {
  params: Promise<{ page: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  // const {
  // paginationProps,
  // scrollButtonsProps,
  // scrollWrapperProps,
  // listGridServerProps,
  // } = listGridFiniteDefaults;

  const {
    buttonProps,
    scrollButtonsProps,
    scrollWrapperProps,
    listGridClientProps,
  } = listGridInfiniteDefaults;

  return (
    <Stack h="100%" w="100%" justify="center" maw={dimensions.mawLg}>
      <GetBooks params={params} searchParams={searchParams}>
        {(booksPage) => (
          // <ListGridFinite
          //   dataPage={booksPage}
          //   DataDetailsServer={BooksDetailsServer}
          //   paginationProps={{
          //     ...paginationProps,
          //     value: booksPage.page + 1,
          //     total: booksPage.totalPages,
          //   }}
          //   scrollButtonsProps={scrollButtonsProps}
          //   scrollWrapperProps={scrollWrapperProps}
          //   listGridServerProps={{
          //     ...listGridServerProps,
          //     content: booksPage.content,
          //     DataItemServer: BooksItemServer,
          //   }}
          // />
          <ListGridInfinite
            getData={getBooks}
            initialDataPage={booksPage}
            DataDetailsClient={BooksDetailsClient}
            getDataArgs={{
              sort: booksPage.sort,
              order: booksPage.order,
              filter: booksPage.filter,
              search: booksPage.search,
            }}
            buttonProps={buttonProps}
            scrollButtonsProps={{
              ...scrollButtonsProps,
              scrollbar: "container" as const,
            }}
            scrollWrapperProps={scrollWrapperProps}
            listGridClientProps={{
              ...listGridClientProps,
              content: booksPage.content,
              DataItemClient: BooksItemClient,
            }}
          />
        )}
      </GetBooks>
    </Stack>
  );
}
