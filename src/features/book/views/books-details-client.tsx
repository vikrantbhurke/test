"use client";
import { Group, Text } from "@mantine/core";
import { dimensions } from "@/global/constants";
import BooksFilterButton from "./books-filter-button";

export default function BooksDetailsClient({ dataPage }: any) {
  const { page, totalPages, totalElements } = dataPage;
  const uiPage = page + 1;

  return (
    <Group h={dimensions.detailsHeight} justify="center" align="center">
      <Text>
        Books Details: Page - {uiPage}/{totalPages} | Total Elements -{" "}
        {totalElements}
      </Text>

      <BooksFilterButton />
    </Group>
  );
}
