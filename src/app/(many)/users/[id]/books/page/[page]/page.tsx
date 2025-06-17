import { BooksDetails, BooksItem } from "@/features/book/views/client";
import { Paper, Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { getBooks } from "@/features/book/action";
import { UserItem } from "@/features/user/views/server";
import { GetUserById } from "@/features/user/queries/server";
import { GetBooksByAuthorId } from "@/features/book/queries";
import { CollapsibleHeader } from "@/global/components/layouts";
import { listGridDefaults } from "@/global/constants/client";
import { ListGridOuter } from "@/global/components/list-grid/client";
import { GetSession } from "@/features/user/queries/server";

type PageProps = {
  params: Promise<{ id: string; page: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const {
    buttonProps,
    scrollButtonsProps,
    scrollWrapperProps,
    listGridInnerProps: listGridClientProps,
  } = listGridDefaults;

  return (
    <Stack h="100%" w="100%" justify="center" maw={dimensions.mawLg}>
      <Stack p="xs">
        <GetSession>
          {(session) => (
            <GetUserById params={params}>
              {(user) => (
                <>
                  <CollapsibleHeader
                    Component={
                      <Paper radius="md" p="xl">
                        <UserItem
                          user={user}
                          radius={0}
                          sessionUser={{ id: session?.user.id }}
                        />
                      </Paper>
                    }
                  />

                  <Paper radius="md" p="xl">
                    <UserItem
                      user={user}
                      sessionUser={{ id: session?.user.id }}
                    />
                  </Paper>
                </>
              )}
            </GetUserById>
          )}
        </GetSession>
      </Stack>

      <GetBooksByAuthorId params={params} searchParams={searchParams}>
        {(booksPage) => (
          <>
            {booksPage.content.length === 0 ? (
              <></>
            ) : (
              <>
                <ListGridOuter
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
                    ...listGridClientProps,
                    content: booksPage.content,
                    DataItem: BooksItem,
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
