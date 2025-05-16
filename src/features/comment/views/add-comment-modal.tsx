"use client";
import { Modal } from "@mantine/core";
import { modalProps } from "@/global/constants";
import AddCommentForm from "./add-comment-form";

type AddCommentModalProps = {
  bookId: string;
  title: string;
  opened: boolean;
  close: () => void;
};

export default function AddCommentModal({
  bookId,
  title,
  close,
  opened,
}: AddCommentModalProps) {
  return (
    <Modal
      centered
      title={title}
      onClose={close}
      opened={opened}
      overlayProps={modalProps.overlayProps}>
      <AddCommentForm bookId={bookId} />
    </Modal>
  );
}
