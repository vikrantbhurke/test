import { Group, Text } from "@mantine/core";
import { dimensions } from "@/global/constants";

export default async function CommentsDetailsServer({ dataPage }: any) {
  const { page, totalPages, totalElements } = dataPage;

  return (
    <Group h={dimensions.detailsHeight} justify="center" align="center">
      <Text>
        Comments Details: Page - {page + 1}/{totalPages} | Total Elements -{" "}
        {totalElements}
      </Text>
    </Group>
  );
}
