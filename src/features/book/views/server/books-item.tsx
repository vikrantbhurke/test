import {
  Text,
  Group,
  Paper,
  Stack,
  Title,
  Button,
  Anchor,
  Avatar,
} from "@mantine/core";
import Link from "next/link";
import {
  viewBookRoute,
  editBookRoute,
  viewUserRoute,
  userBooksRoute,
  bookCommentsRoute,
} from "@/global/constants/routes";
import { DropBookButton } from "../client";
import { Clearance } from "@/features/user/enums";
import { Self, Clear } from "@/global/components/common/server";
import { LikeButton, LikePublicButton } from "@/features/book-liker/views";

export default async function BooksItem({ item, sessionUser }: any) {
  const { id, title, synopsis, authorId, genre, like } = item;

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

          <Text>{genre}</Text>
        </Stack>

        <Group justify="center">
          <Clear
            role={sessionUser.role}
            level={Clearance.LevelTwo}
            compOne={
              <LikeButton
                bookId={id}
                likerId={sessionUser.id}
                likes={item.likes}
                like={like}
              />
            }
            compTwo={<LikePublicButton likes={item.likes} />}
          />

          <Self idOne={sessionUser.id} idTwo={authorId.id}>
            <Button
              color="blue"
              component={Link}
              href={editBookRoute(id)}
              size="xs"
              fz="xs"
              aria-label="Edit Book">
              Edit
            </Button>

            <DropBookButton id={id} />
          </Self>
        </Group>
      </Stack>
    </Paper>
  );
}
