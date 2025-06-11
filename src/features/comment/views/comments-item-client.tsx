"use client";
import { Session } from "next-auth";
import DropCommentButton from "./drop-comment-button";
import { Paper, Stack, Text, Title } from "@mantine/core";

type CommentsItemClientProps = {
  item: any;
  session?: Session | null;
};

export default function CommentsItemClient({
  item,
  session,
}: CommentsItemClientProps) {
  const { id, body, commenterId } = item;
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
