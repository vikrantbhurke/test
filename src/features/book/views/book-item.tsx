import Link from "next/link";
import DropBookButton from "./drop-book-button";
import {
  ActionIcon,
  Anchor,
  Button,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  bookCommentsRoute,
  editBookRoute,
  userBooksRoute,
  userRoute,
} from "@/global/constants/routes";
import { LikeButton } from "@/features/book-liker/views";
import { checkBookLiker } from "@/features/book-liker/action";
import { IconHeartFilled } from "@tabler/icons-react";

export default async function BookItem({ book }: any) {
  const { id, title, synopsis, authorId, genre } = book;

  const response = await checkBookLiker({
    bookId: id,
    likerId: "6801671fe63ce6ae26ae2f21", // Replace with auth ID from cookie
  });

  return (
    <Stack gap="sm">
      <Title order={6}>{title}</Title>

      <Text>{synopsis}</Text>

      <Stack gap={4}>
        <Anchor component={Link} href={userRoute(authorId.id)}>
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
        {!response || !response.success ? (
          <Group gap={0}>
            <ActionIcon c="crimson" variant="subtle">
              <IconHeartFilled size={16} />
            </ActionIcon>
            <Text>0</Text>
          </Group>
        ) : (
          <LikeButton bookId={id} likes={book.likes} exists={response.exists} />
        )}

        <Button color="blue" component={Link} href={editBookRoute(id)}>
          Edit
        </Button>

        <DropBookButton id={id} />
      </Group>
    </Stack>
  );
}
