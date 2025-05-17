import { Stack } from "@mantine/core";
import { UserItem } from "@/features/user/views";
import { getBooks } from "@/features/book/action";
import { GetUserById } from "@/features/user/queries";
import { GetBooksByAuthorId } from "@/features/book/queries";
import { ListGridInfinite } from "@/global/components/list-grid";
import { dimensions, listGridInfiniteDefaults } from "@/global/constants";
import { BooksDetailsClient, BooksItemClient } from "@/features/book/views";
import { CollapsibleHeader } from "@/global/components/layouts";

type PageProps = {
  params: Promise<{ id: string; page: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await delay(3000);

  const {
    buttonProps,
    scrollButtonsProps,
    scrollWrapperProps,
    listGridClientProps,
  } = listGridInfiniteDefaults;

  return (
    <Stack h="100%" w="100%" justify="center" maw={dimensions.mawLg}>
      <Stack p="xs">
        <GetUserById params={params}>
          {(user) => (
            <>
              <CollapsibleHeader
                Component={<UserItem user={user} radius={0} />}
              />
              <UserItem user={user} />
            </>
          )}
        </GetUserById>
      </Stack>

      <GetBooksByAuthorId params={params} searchParams={searchParams}>
        {(booksPage) => (
          <>
            {booksPage.content.length === 0 ? (
              <></>
            ) : (
              <>
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
                  scrollButtonsProps={scrollButtonsProps}
                  scrollWrapperProps={scrollWrapperProps}
                  listGridClientProps={{
                    ...listGridClientProps,
                    content: booksPage.content,
                    DataItemClient: BooksItemClient,
                  }}
                />
              </>
            )}
          </>
        )}
      </GetBooksByAuthorId>
    </Stack>
  );
}
