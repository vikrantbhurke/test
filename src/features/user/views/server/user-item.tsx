import Link from "next/link";
import { ProfilePic } from "../client";
import { editUserRoute } from "@/global/constants/routes";
import { DropBooksButton } from "@/features/book/views/client";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { Self } from "@/global/components/common/server";

type UserItemProps = {
  user: any;
  radius?: string | number;
};

export default async function UserItem({ user }: UserItemProps) {
  const { id, firstname, lastname, username } = user;

  return (
    <Stack gap={4} align="center">
      <ProfilePic user={user} />

      <Title order={6}>
        {firstname} {lastname}
      </Title>

      <Text>{username}</Text>

      <Self id={id}>
        <Group justify="center">
          <Button component={Link} href={editUserRoute(id)} size="xs" fz="xs">
            Edit
          </Button>

          <DropBooksButton authorId={id} />
        </Group>
      </Self>
    </Stack>
  );
}
