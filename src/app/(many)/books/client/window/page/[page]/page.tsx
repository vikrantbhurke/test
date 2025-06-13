import { Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { getBooks } from "@/features/book/action";
import { GetBooks } from "@/features/book/queries";
import { listGridDefaults } from "@/global/constants/client";
import { ListGridOuter } from "@/global/components/list-grid/client";
import { BooksItem, BooksDetails } from "@/features/book/views/client";

type PageProps = {
  params: Promise<{ page: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const {
    buttonProps,
    scrollButtonsProps,
    scrollWrapperProps,
    listGridInnerProps,
  } = listGridDefaults;

  return (
    <Stack h="100%" w="100%" justify="center" maw={dimensions.mawLg}>
      <GetBooks params={params} searchParams={searchParams}>
        {(booksPage) => (
          <ListGridOuter
            more="scroll"
            getData={getBooks}
            initialDataPage={booksPage}
            DataDetails={BooksDetails}
            getDataArgs={{
              sort: booksPage.sort,
              order: booksPage.order,
              filter: booksPage.filter,
              search: booksPage.search,
            }}
            buttonProps={buttonProps}
            scrollButtonsProps={scrollButtonsProps}
            scrollWrapperProps={scrollWrapperProps}
            listGridInnerProps={{
              ...listGridInnerProps,
              content: booksPage.content,
              DataItem: BooksItem,
            }}
          />
        )}
      </GetBooks>
    </Stack>
  );
}
