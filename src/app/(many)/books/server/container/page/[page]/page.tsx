import { Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { GetBooks } from "@/features/book/queries";
import { listGridDefaults } from "@/global/constants/server";
import { ListGridOuter } from "@/global/components/list-grid/server";
import { BooksItem, BooksDetails } from "@/features/book/views/server";
import { GetSession } from "@/features/user/queries/server";
import { CheckBookLikers } from "@/features/book-liker/queries/server";

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
              <CheckBookLikers
                bookLikers={booksPage.content.map((book: any) => ({
                  bookId: book.id,
                  likerId: session?.user.id,
                }))}>
                {(existsArray) => (
                  <ListGridOuter
                    dataPage={booksPage}
                    DataDetails={BooksDetails}
                    paginationProps={{
                      ...paginationProps,
                      value: booksPage.page + 1,
                      total: booksPage.totalPages,
                    }}
                    scrollButtonsProps={{
                      ...scrollButtonsProps,
                      scrollbar: "container",
                    }}
                    scrollWrapperProps={scrollWrapperProps}
                    listGridInnerProps={{
                      ...listGridInnerProps,
                      sessionUser: {
                        id: session?.user.id,
                        role: session?.user.role,
                      },
                      content: booksPage.content.map(
                        (book: any, index: number) => ({
                          ...book,
                          like: existsArray[index],
                        })
                      ),
                      DataItem: BooksItem,
                    }}
                  />
                )}
              </CheckBookLikers>
            )}
          </GetBooks>
        )}
      </GetSession>
    </Stack>
  );
}
