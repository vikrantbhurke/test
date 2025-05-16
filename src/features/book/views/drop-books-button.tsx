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
        close={close}
        buttonColor="red"
        opened={opened}
        loaderType="dots"
        buttonLabel="Delete All"
        route={booksRoute}
        action={async () => await dropBooksByAuthorId(authorId)}
        message="Are you sure you want to delete all your books?"
      />

      <Button color="red" onClick={open}>
        Delete Books
      </Button>
    </>
  );
}
