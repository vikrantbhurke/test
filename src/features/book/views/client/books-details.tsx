"use client";
import { Group, Text } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { BooksFilterButton } from "./books-filter-button";

export function BooksDetails({ dataPage }: any) {
  const { page, totalPages, totalElements, search } = dataPage;
  const uiPage = page + 1;

  return (
    <Group
      p="xs"
      h={dimensions.detailsHeight}
      justify="space-between"
      align="center">
      <Group>
        <Text>
          Page: {uiPage}/{totalPages}
        </Text>

        <Text>Total: {totalElements}</Text>
      </Group>

      {search && <Text>Search Term - {search}</Text>}

      <BooksFilterButton />
    </Group>
  );
}
