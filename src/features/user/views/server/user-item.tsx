import Link from "next/link";
import { ProfilePic } from "../client";
import { editUserRoute } from "@/global/constants/routes";
import { DropBooksButton } from "@/features/book/views/client";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { Self } from "@/global/components/common/server";

type UserItemProps = {
  user: any;
  sessionUser: any | null;
  radius?: string | number;
};

export default async function UserItem({ user, sessionUser }: UserItemProps) {
  return (
    <Stack gap={4} align="center">
      <ProfilePic user={user} />

      <Title order={6}>
        {user.firstname} {user.lastname}
      </Title>

      <Text>{user.username}</Text>

      <Self idOne={sessionUser.id} idTwo={user.id}>
        <Group justify="center">
          <Button
            component={Link}
            href={editUserRoute(user.id)}
            size="xs"
            fz="xs">
            Edit
          </Button>

          <DropBooksButton authorId={user.id} />
        </Group>
      </Self>
    </Stack>
  );
}
