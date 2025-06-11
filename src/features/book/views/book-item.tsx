import Link from "next/link";
import DropBookButton from "./drop-book-button";
import {
  Anchor,
  Avatar,
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
  viewUserRoute,
} from "@/global/constants/routes";
import { LikeButton, LikeUnauthButton } from "@/features/book-liker/views";
import { checkBookLiker } from "@/features/book-liker/action";
import { auth } from "@/auth";

export default async function BookItem({ book }: any) {
  const { id, title, synopsis, authorId, genre } = book;
  const session = await auth();
  const userId = session?.user?.id;
  let bookLikerResponse = null;

  if (userId) {
    bookLikerResponse = await checkBookLiker({
      bookId: id,
      likerId: userId,
    });
  }

  const aid = authorId.id;
  const name = authorId.firstname + " " + authorId.lastname;
  const image = authorId.avatar.secureUrl || undefined;

  return (
    <Stack gap="sm">
      <Title order={6}>{title}</Title>

      <Text>{synopsis}</Text>

      <Stack gap={4}>
        <Anchor component={Link} href={viewUserRoute(authorId.id)}>
          <Group gap="xs">
            {!aid && <Avatar src="" size={20} />}
            {aid && !image && <Avatar name={name} color="initials" size={20} />}
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
            </Text>{" "}
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
        {userId && bookLikerResponse && bookLikerResponse.success ? (
          <LikeButton
            bookId={id}
            likerId={userId}
            likes={book.likes}
            exists={bookLikerResponse.exists}
          />
        ) : (
          <LikeUnauthButton likes={book.likes} />
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
  );
}
