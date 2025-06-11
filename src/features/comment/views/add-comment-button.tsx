"use client";
import Link from "next/link";
import { Session } from "next-auth";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddCommentModal from "./add-comment-modal";
import { signInRoute } from "@/global/constants/routes";

type AddCommentButtonProps = {
  bookId: string;
  session?: Session | null;
};

export default function AddCommentButton({
  bookId,
  session,
}: AddCommentButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      {session?.user?.id ? (
        <Button onClick={open} size="xs" fz="xs">
          Add Comment
        </Button>
      ) : (
        <Button component={Link} href={signInRoute} size="xs" fz="xs">
          Add Comment
        </Button>
      )}

      <AddCommentModal
        bookId={bookId}
        opened={opened}
        close={close}
        session={session}
      />
    </>
  );
}
