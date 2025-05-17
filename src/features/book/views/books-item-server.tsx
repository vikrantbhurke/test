import {
  Text,
  Group,
  Paper,
  Stack,
  Title,
  Button,
  Anchor,
  ActionIcon,
} from "@mantine/core";
import Link from "next/link";
import DropBookButton from "./drop-book-button";
import {
  bookCommentsRoute,
  viewBookRoute,
  editBookRoute,
  userBooksRoute,
  viewUserRoute,
} from "@/global/constants/routes";
import { LikeButton } from "@/features/book-liker/views";
import { checkBookLiker } from "@/features/book-liker/action";
import { IconHeartFilled } from "@tabler/icons-react";

export default async function BooksItemServer({ item }: any) {
  const { id, title, synopsis, authorId, genre } = item;

  const response = await checkBookLiker({
    bookId: id,
    likerId: "6801671fe63ce6ae26ae2f21", // Replace with auth ID from cookie
  });

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

          <Text>{genre}</Text>
        </Stack>

        <Group justify="center">
          {!response || !response.success ? (
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
              exists={response.exists}
            />
          )}

          <Button color="blue" component={Link} href={editBookRoute(id)}>
            Edit Book
          </Button>

          <DropBookButton id={id} />
        </Group>
      </Stack>
    </Paper>
  );
}
