import { Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { GetBooks } from "@/features/book/queries";
import { listGridDefaults } from "@/global/constants/server";
import { ListGridOuter } from "@/global/components/list-grid/server";
import { BooksItem, BooksDetails } from "@/features/book/views/server";
import { GetSession } from "@/features/user/queries/server";

type PageProps = {
  params: Promise<{ page: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const {
    paginationProps,
    scrollButtonsProps,
    scrollWrapperProps,
    listGridInnerProps,
  } = listGridDefaults;

  return (
    <Stack h="100%" w="100%" justify="center" maw={dimensions.mawLg}>
      <GetSession>
        {(session) => (
          <GetBooks params={params} searchParams={searchParams}>
            {(booksPage) => (
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
                  session,
                  content: booksPage.content,
                  DataItem: BooksItem,
                }}
              />
            )}
          </GetBooks>
        )}
      </GetSession>
    </Stack>
  );
}
