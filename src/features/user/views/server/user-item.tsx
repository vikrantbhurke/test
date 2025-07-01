import Link from "next/link";
import { ProfilePic } from "../client";
import { editUserRoute } from "@/global/constants/routes";
import { DropBooksButton } from "@/features/book/views/client";
import { Button, Group, Stack, Text, Title } from "@mantine/core";

type UserItemProps = {
  user: any;
  auth: any | null;
  radius?: string | number;
};

export async function UserItem({ user, auth }: UserItemProps) {
  return (
    <Stack gap={4} align="center">
      <ProfilePic user={user} />

      <Title order={6}>
        {user.firstname} {user.lastname}
      </Title>

      <Text>{user.username}</Text>

      {auth.id === user.id && (
        <Group justify="center">
          <Button
            component={Link}
            aria-label="Edit User"
            href={editUserRoute(user.id)}
            size="xs"
            fz="xs">
            Edit
          </Button>

          <DropBooksButton authorId={user.id} />
        </Group>
      )}
    </Stack>
  );
}
