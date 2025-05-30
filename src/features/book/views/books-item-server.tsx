import {
  Text,
  Group,
  Paper,
  Stack,
  Title,
  Button,
  Anchor,
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
import { LikeButton, LikeUnauthButton } from "@/features/book-liker/views";
import { checkBookLiker } from "@/features/book-liker/action";
import { auth } from "@/auth";

export default async function BooksItemServer({ item }: any) {
  const { id, title, synopsis, authorId, genre } = item;
  const session = await auth();
  const userId = session?.user?.id;
  let bookLikerResponse = null;

  if (userId) {
    bookLikerResponse = await checkBookLiker({
      bookId: id,
      likerId: userId,
    });
  }

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
          {userId && bookLikerResponse && bookLikerResponse.success ? (
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
