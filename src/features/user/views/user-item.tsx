import Link from "next/link";
import { editUserRoute } from "@/global/constants/routes";
import DropBooksButton from "@/features/book/views/drop-books-button";
import { Button, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { auth } from "@/auth";
import ProfilePic from "./profile-pic";

type UserItemProps = {
  user: any;
  radius?: string | number;
};

export default async function UserItem({ user, radius = "md" }: UserItemProps) {
  const { id, firstname, lastname, username } = user;
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Paper radius={radius} p="xl">
      <Stack gap="sm">
        <ProfilePic user={user} />

        <Title order={6}>
          {firstname} {lastname}
        </Title>

        <Text>{username}</Text>

        {userId && userId === id && (
          <Group justify="center">
            <Button component={Link} href={editUserRoute(id)} size="xs" fz="xs">
              Edit
            </Button>

            <DropBooksButton authorId={id} />
          </Group>
        )}
      </Stack>
    </Paper>
  );
}
