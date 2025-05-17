"use client";
import {
  Text,
  Group,
  Title,
  Stack,
  Paper,
  Anchor,
  Button,
  ActionIcon,
} from "@mantine/core";
import Link from "next/link";
import DropBookButton from "./drop-book-button";
import {
  viewUserRoute,
  viewBookRoute,
  editBookRoute,
  userBooksRoute,
  bookCommentsRoute,
} from "@/global/constants/routes";
import { LikeButton } from "@/features/book-liker/views";
import { checkBookLiker } from "@/features/book-liker/action";
import useSWR from "swr";
import { IconHeartFilled } from "@tabler/icons-react";

export default function BooksItemClient({ item }: any) {
  const { id, title, synopsis, authorId, genre } = item;

  const { data } = useSWR(
    { bookId: id, likerId: "6801671fe63ce6ae26ae2f21" }, // Replace with auth ID from cookie
    checkBookLiker
  );

  return (
    <Paper p="xl">
      <Stack gap="sm">
        <Anchor component={Link} href={viewBookRoute(id)}>
          <Title order={6}>{title}</Title>
        </Anchor>

        <Text>{synopsis}</Text>

        <Stack gap={4}>
          <Anchor component={Link} href={viewUserRoute(authorId.id)}>
            <Text>
              {authorId.firstname} {authorId.lastname}
            </Text>
          </Anchor>

          <Anchor component={Link} href={userBooksRoute(authorId.id)}>
            <Text>
              {authorId.firstname} {authorId.lastname}&apos;s Books
            </Text>
          </Anchor>

          <Anchor component={Link} href={bookCommentsRoute(id)}>
            <Text>Comments</Text>
          </Anchor>

          <Text>Genre: {genre}</Text>
        </Stack>

        <Group justify="center">
          {!data || !data?.success ? (
            <Group gap={0}>
              <ActionIcon c="crimson" variant="subtle">
                <IconHeartFilled size={16} />
              </ActionIcon>
              <Text>0</Text>
            </Group>
          ) : (
            <LikeButton
              bookId={id}
              likes={item.likes}
              exists={data.exists || true}
            />
          )}

          <Button
            color="blue"
            component={Link}
            href={editBookRoute(id)}
            size="xs"
            fz="xs">
            Edit
          </Button>

          <DropBookButton id={id} />
        </Group>
      </Stack>
    </Paper>
  );
}
