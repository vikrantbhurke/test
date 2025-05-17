import Link from "next/link";
import DeleteAccountButton from "./delete-account-button";
import { editUserRoute } from "@/global/constants/routes";
import { Button, Group, Paper, Stack, Text, Title } from "@mantine/core";
import DropBooksButton from "@/features/book/views/drop-books-button";

type UserItemProps = {
  user: any;
  radius?: string | number;
};

export default function UserItem({ user, radius = "md" }: UserItemProps) {
  const { id, firstname, lastname, username } = user;

  return (
    <Paper radius={radius} p="xl">
      <Stack gap="sm">
        <Title order={6}>
          {firstname} {lastname}
        </Title>

        <Text>{username}</Text>

        <Group justify="center">
          <Button component={Link} href={editUserRoute(id)}>
            Edit
          </Button>

          <DropBooksButton authorId={id} />
          <DeleteAccountButton id={id} />
        </Group>
      </Stack>
    </Paper>
  );
}
