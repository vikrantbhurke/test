import { Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { getBooks } from "@/features/book/action";
import { GetBooks } from "@/features/book/queries";
import { listGridDefaults } from "@/global/constants/client";
import { ListGridOuter } from "@/global/components/list-grid/client";
import { BooksItem, BooksDetails } from "@/features/book/views/client";
import { GetSession } from "@/features/user/queries/server";
import { CheckBookLikers } from "@/features/book-liker/queries/server";

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
