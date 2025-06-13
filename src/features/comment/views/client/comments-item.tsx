"use client";
import DropCommentButton from "./drop-comment-button";
import { Paper, Stack, Text, Title } from "@mantine/core";
import { Self } from "@/global/components/common/client";

export default function CommentsItem({ item }: any) {
  const { id, body, commenterId } = item;

  return (
    <Paper p="lg">
      <Stack gap="sm">
        <Title order={6}>{body}</Title>
        <Text>Comment By: {commenterId.username}</Text>

        <Self id={commenterId.id}>
          <Stack gap="sm" align="start">
            <DropCommentButton id={id} />
          </Stack>
        </Self>
      </Stack>
    </Paper>
  );
}
