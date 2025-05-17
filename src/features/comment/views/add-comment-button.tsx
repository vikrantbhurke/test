"use client";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddCommentModal from "./add-comment-modal";

type AddCommentButtonProps = {
  bookId: string;
};

export default function AddCommentButton({ bookId }: AddCommentButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button onClick={open} size="xs" fz="xs">
        Add Comment
      </Button>

      <AddCommentModal bookId={bookId} opened={opened} close={close} />
    </>
  );
}
