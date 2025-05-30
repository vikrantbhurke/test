"use client";
import Link from "next/link";
import { Button } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useDisclosure } from "@mantine/hooks";
import AddCommentModal from "./add-comment-modal";
import { signInRoute } from "@/global/constants/routes";

type AddCommentButtonProps = {
  bookId: string;
};

export default function AddCommentButton({ bookId }: AddCommentButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: session } = useSession();
  const id = session?.user?.id;

  return (
    <>
      {id ? (
        <Button onClick={open} size="xs" fz="xs">
          Add Comment
        </Button>
      ) : (
        <Button component={Link} href={signInRoute} size="xs" fz="xs">
          Add Comment
        </Button>
      )}

      <AddCommentModal bookId={bookId} opened={opened} close={close} />
    </>
  );
}
