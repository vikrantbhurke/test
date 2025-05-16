"use client";
import { Button } from "@mantine/core";
import { dropCommentById } from "../action";
import { useDisclosure } from "@mantine/hooks";
import { CustomModal } from "@/global/components/common";

type DropCommentButtonProps = {
  id: string;
};

export default function DropCommentButton({ id }: DropCommentButtonProps) {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <CustomModal
        close={close}
        buttonColor="red"
        opened={opened}
        loaderType="dots"
        buttonLabel="Delete"
        action={async () => await dropCommentById(id)}
        message="Are you sure you want to delete this comment?"
      />

      <Button color="red" onClick={open}>
        Delete
      </Button>
    </>
  );
}
