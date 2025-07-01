"use client";
import Link from "next/link";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AddCommentModal } from "./add-comment-modal";
import { Clearance } from "@/features/user/enums";
import { signInRoute } from "@/global/constants/routes";

type AddCommentButtonProps = {
  bookId: string;
  auth: any;
};

export function AddCommentButton({ bookId, auth }: AddCommentButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      {Clearance.LevelTwo.includes(auth.role) ? (
        <Button onClick={open} size="xs" fz="xs" aria-label="Add Comment">
          Add Comment
        </Button>
      ) : (
        <Button
          component={Link}
          href={signInRoute}
          size="xs"
          fz="xs"
          aria-label="Add Comment">
          Add Comment
        </Button>
      )}

      <AddCommentModal
        bookId={bookId}
        opened={opened}
        close={close}
        auth={auth}
      />
    </>
  );
}
