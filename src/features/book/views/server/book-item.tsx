import Link from "next/link";
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
import { Clear, Self } from "@/global/components/common/server";
import { DropBookButton } from "../client";
import { GetSession } from "@/features/user/queries/server";
import { Clearance } from "@/features/user/enums";
import { CheckBookLiker } from "@/features/book-liker/queries/server";
import { LikeButton, LikePublicButton } from "@/features/book-liker/views";

export default async function BookItem({ book }: any) {
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
          level={Clearance.LevelTwo}
          one={
            <GetSession>
              {(session) => (
                <>
                  {session && (
                    <CheckBookLiker bookId={id} likerId={session.user.id}>
                      {(exists: boolean) => (
                        <LikeButton
                          bookId={id}
                          likerId={session.user.id}
                          likes={book.likes}
                          exists={exists}
                        />
                      )}
                    </CheckBookLiker>
                  )}
                </>
              )}
            </GetSession>
          }
          two={<LikePublicButton likes={book.likes} />}
        />

        <Self id={authorId.id}>
          <Button
            color="blue"
            component={Link}
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
