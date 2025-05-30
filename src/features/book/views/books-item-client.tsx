"use client";
import {
  Text,
  Group,
  Title,
  Stack,
  Paper,
  Anchor,
  Button,
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
import { LikeButton, LikeUnauthButton } from "@/features/book-liker/views";
import { checkBookLiker } from "@/features/book-liker/action";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function BooksItemClient({ item }: any) {
  const { id, title, synopsis, authorId, genre } = item;
  const { data: session } = useSession();
  const userId = session?.user?.id || null;

  const { data: bookLikerResponse } = useSWR(
    userId && { bookId: id, likerId: userId },
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
          {userId && bookLikerResponse && bookLikerResponse?.success ? (
            <LikeButton
              bookId={id}
              likerId={userId}
              likes={item.likes}
              exists={bookLikerResponse.exists}
            />
          ) : (
            <LikeUnauthButton likes={item.likes} />
          )}

          {userId === authorId.id && (
            <Button
              color="blue"
              component={Link}
              href={editBookRoute(id)}
              size="xs"
              fz="xs">
              Edit
            </Button>
          )}

          {userId === authorId.id && <DropBookButton id={id} />}
        </Group>
      </Stack>
    </Paper>
  );
}
