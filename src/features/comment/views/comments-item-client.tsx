"use client";
import { useSession } from "next-auth/react";
import DropCommentButton from "./drop-comment-button";
import { Paper, Stack, Text, Title } from "@mantine/core";

export default function CommentsItemClient({ item }: any) {
  const { id, body, commenterId } = item;
  const { data: session } = useSession();
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
