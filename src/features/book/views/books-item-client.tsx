"use client";
import {
  Text,
  Group,
  Title,
  Stack,
  Paper,
  Anchor,
  Button,
  Avatar,
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
import useSWR from "swr";
import { Session } from "next-auth";
import { checkBookLiker } from "@/features/book-liker/action";
import { LikeButton, LikeUnauthButton } from "@/features/book-liker/views";

type BooksItemClientProps = {
  item: any;
  session?: Session | null;
};

export default function BooksItemClient({
  item,
  session,
}: BooksItemClientProps) {
  const { id, title, synopsis, authorId, genre } = item;
  const userId = session?.user?.id || null;

  const { data: bookLikerResponse } = useSWR(
    userId && { bookId: id, likerId: userId },
    checkBookLiker
  );

  const aid = authorId.id;
  const name = authorId.firstname + " " + authorId.lastname;
  const image = authorId.avatar.secureUrl || undefined;

  return (
    <Paper p="xl">
      <Stack gap="sm">
        <Anchor component={Link} href={viewBookRoute(id)}>
          <Title order={6}>{title}</Title>
        </Anchor>

        <Text>{synopsis}</Text>

        <Stack gap={4}>
          <Anchor component={Link} href={viewUserRoute(authorId.id)}>
            <Group gap="xs">
              {!aid && <Avatar src="" size={20} />}
              {aid && !image && (
                <Avatar name={name} color="initials" size={20} />
              )}
              {aid && image && (
                <Avatar
                  src={image}
                  alt="Avatar"
                  size={20}
                  className="rounded-full"
                />
              )}

              <Text>
                {authorId.firstname} {authorId.lastname}
              </Text>
            </Group>
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
