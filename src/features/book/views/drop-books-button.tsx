"use client";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { dropBooksByAuthorId } from "../action";
import { CustomModal } from "@/global/components/common";
import { booksRoute } from "@/global/constants/routes";

type DropBooksButtonProps = {
  authorId: string;
};

export default function DropBooksButton({ authorId }: DropBooksButtonProps) {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <CustomModal
        buttonProps={{
          color: "red",
          fullWidth: true,
          loaderProps: { type: "dots" },
        }}
        close={close}
        opened={opened}
        buttonLabel="Delete All"
        route={booksRoute}
        routeType="push"
        action={async () => await dropBooksByAuthorId(authorId)}
        message="Are you sure you want to delete all your books?"
      />

      <Button color="red" onClick={open} size="xs" fz="xs">
        Delete Books
      </Button>
    </>
  );
}
