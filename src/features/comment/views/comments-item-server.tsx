import DropCommentButton from "./drop-comment-button";
import { Paper, Stack, Text, Title } from "@mantine/core";

export default function CommentsItemServer({ item }: any) {
  const { id, body, commenterId } = item;

  return (
    <Paper p="lg">
      <Stack gap="sm">
        <Title order={6}>{body}</Title>
        <Text>Comment By: {commenterId.username}</Text>
        <Stack gap="sm" align="start">
          <DropCommentButton id={id} />
        </Stack>
      </Stack>
    </Paper>
  );
}
