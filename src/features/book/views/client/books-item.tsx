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
import {
  viewUserRoute,
  viewBookRoute,
  editBookRoute,
  userBooksRoute,
  bookCommentsRoute,
} from "@/global/constants/routes";
import { Self, Clear } from "@/global/components/common/client";
import Link from "next/link";
import DropBookButton from "./drop-book-button";
import { Clearance } from "@/features/user/enums";
import { GetSession } from "@/features/user/queries/client";
import { CheckBookLiker } from "@/features/book-liker/queries/client";
import { LikeButton, LikePublicButton } from "@/features/book-liker/views";

type BooksItemProps = {
  item: any;
};

export default function BooksItem({ item }: BooksItemProps) {
  const { id, title, synopsis, authorId, genre } = item;

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
                            likes={item.likes}
                            exists={exists}
                          />
                        )}
                      </CheckBookLiker>
                    )}
                  </>
                )}
              </GetSession>
            }
            two={<LikePublicButton likes={item.likes} />}
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
    </Paper>
  );
}
