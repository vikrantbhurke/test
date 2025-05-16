"use client";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddCommentModal from "./add-comment-modal";
import AddCommentDrawer from "./add-comment-drawer";

type AddCommentButtonProps = {
  bookId: string;
};

export default function AddCommentButton({ bookId }: AddCommentButtonProps) {
  const [drawerOpened, { open: drawerOpen, close: drawerClose }] =
    useDisclosure(false);

  const [modalOpened, { open: modalOpen, close: modalClose }] =
    useDisclosure(false);

  return (
    <>
      <Button hiddenFrom="sm" onClick={drawerOpen}>
        Add Comment
      </Button>

      <Button visibleFrom="sm" onClick={modalOpen}>
        Add Comment
      </Button>

      <AddCommentModal
        bookId={bookId}
        title="Add Comment"
        opened={modalOpened}
        close={modalClose}
      />

      <AddCommentDrawer
        size={250}
        bookId={bookId}
        title="Add Comment"
        opened={drawerOpened}
        close={drawerClose}
      />
    </>
  );
}
