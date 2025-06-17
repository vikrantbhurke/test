"use client";
import Link from "next/link";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddCommentModal from "./add-comment-modal";
import { Clearance } from "@/features/user/enums";
import { signInRoute } from "@/global/constants/routes";
import { Clear } from "@/global/components/common/client";

type AddCommentButtonProps = {
  bookId: string;
  sessionUser: any;
};

export default function AddCommentButton({
  bookId,
  sessionUser,
}: AddCommentButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Clear
        role={sessionUser?.role}
        level={Clearance.LevelTwo}
        compOne={
          <Button onClick={open} size="xs" fz="xs" aria-label="Add Comment">
            Add Comment
          </Button>
        }
        compTwo={
          <Button
            component={Link}
            href={signInRoute}
            size="xs"
            fz="xs"
            aria-label="Add Comment">
            Add Comment
          </Button>
        }
      />

      <AddCommentModal bookId={bookId} opened={opened} close={close} />
    </>
  );
}
