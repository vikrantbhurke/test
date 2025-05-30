import { auth } from "@/auth";
import DropCommentButton from "./drop-comment-button";
import { Paper, Stack, Text, Title } from "@mantine/core";

export default async function CommentsItemServer({ item }: any) {
  const { id, body, commenterId } = item;
  const session = await auth();
  const userId = session?.user?.id || "";

  return (
    <Paper p="lg">
      <Stack gap="sm">
        <Title order={6}>{body}</Title>
        <Text>Comment By: {commenterId.username}</Text>

        {userId === commenterId.id && (
          <Stack gap="sm" align="start">
            <DropCommentButton id={id} />
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
