import { Group, Text } from "@mantine/core";
import { dimensions } from "@/global/constants";

export default async function CommentsDetailsServer({ dataPage }: any) {
  const { page, totalPages, totalElements } = dataPage;
  const uiPage = page + 1;

  return (
    <Group h={dimensions.detailsHeight} justify="start" align="center">
      <Text>
        Page: {uiPage}/{totalPages}
      </Text>

      <Text>Total: {totalElements}</Text>
    </Group>
  );
}
