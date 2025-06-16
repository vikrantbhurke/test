import { DropCommentButton } from "../client";
import { Paper, Stack, Text, Title } from "@mantine/core";
import { Self } from "@/global/components/common/server";

export default async function CommentsItem({ item }: any) {
  const { id, body, commenterId, session } = item;

  return (
    <Paper p="lg">
      <Stack gap="sm">
        <Title order={6}>{body}</Title>
        <Text>Comment By: {commenterId.username}</Text>

        <Self id={commenterId.id} session={session}>
          <Stack gap="sm" align="start">
            <DropCommentButton id={id} />
          </Stack>
        </Self>
      </Stack>
    </Paper>
  );
}
