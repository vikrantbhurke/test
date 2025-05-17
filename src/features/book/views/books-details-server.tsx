import { Group, Text } from "@mantine/core";
import { dimensions } from "@/global/constants";
import BooksFilterButton from "./books-filter-button";

export default async function BooksDetailsServer({ dataPage }: any) {
  const { page, totalPages, totalElements, search } = dataPage;
  const uiPage = page + 1;

  return (
    <Group h={dimensions.detailsHeight} justify="space-between" align="center">
      <Group>
        <Text>
          Page: {uiPage}/{totalPages}
        </Text>

        <Text>Total: {totalElements}</Text>
      </Group>

      {search && <Text>Search Term - {search}</Text>}

      <BooksFilterButton />
      {/* DropBookByAuthorButton - if authorId.id matches authenticated user id  */}
    </Group>
  );
}
