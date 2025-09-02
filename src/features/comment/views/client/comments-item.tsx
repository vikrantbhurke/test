"use client";
import { DropCommentButton } from "./drop-comment-button";
import { Stack, Text, Title } from "@mantine/core";

export function CommentsItem({ item, auth }: any) {
  const { id, body, commenterId } = item;

  return (
      <Stack gap="sm">
        <Title order={6}>{body}</Title>
        <Text>Comment By: {commenterId.username}</Text>

        {auth.id === commenterId.id && (
          <Stack gap="sm" align="start">
            <DropCommentButton id={id} />
          </Stack>
        )}
      </Stack>
  );
}
