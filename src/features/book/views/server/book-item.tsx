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
  editBookRoute,
  viewUserRoute,
  userBooksRoute,
  bookCommentsRoute,
} from "@/global/constants/routes";
import Link from "next/link";
import { DropBookButton } from "../client";
import { Clearance } from "@/features/user/enums";
import { Clear, Self } from "@/global/components/common/server";
import { CheckBookLiker } from "@/features/book-liker/queries/server";
import { LikeButton, LikePublicButton } from "@/features/book-liker/views";

export default async function BookItem({ book, sessionUser }: any) {
  const { id, title, synopsis, authorId, genre } = book;

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
            <Text>{name}</Text>
          </Group>
        </Anchor>

        <Anchor component={Link} href={userBooksRoute(authorId.id)}>
          <Text>{name}&apos;s Books</Text>
        </Anchor>

        <Anchor component={Link} href={bookCommentsRoute(id)}>
          <Text>Comments</Text>
        </Anchor>

        <Text>Genre: {genre}</Text>
      </Stack>

      <Group justify="center">
        <Clear
          role={sessionUser.role}
          level={Clearance.LevelTwo}
          compOne={
            sessionUser.id && (
              <CheckBookLiker bookId={id} likerId={sessionUser.id}>
                {(exists: boolean) => (
                  <LikeButton
                    bookId={id}
                    likerId={sessionUser.id}
                    likes={book.likes}
                    like={exists}
                  />
                )}
              </CheckBookLiker>
            )
          }
          compTwo={<LikePublicButton likes={book.likes} />}
        />

        <Self idOne={sessionUser.id} idTwo={authorId.id}>
          <Button
            color="blue"
            component={Link}
            aria-label="Edit Book"
            href={editBookRoute(id)}
            size="xs"
            fz="xs">
            Edit
          </Button>

          <DropBookButton id={id} />
        </Self>
      </Group>
    </Stack>
  );
}
