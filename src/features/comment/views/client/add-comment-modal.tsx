"use client";
import { Modal } from "@mantine/core";
import { modalProps } from "@/global/constants";
import { AddCommentForm } from "./add-comment-form";

type AddCommentModalProps = {
  bookId: string;
  opened: boolean;
  close: () => void;
  auth: any;
};

export function AddCommentModal({
  bookId,
  close,
  opened,
  auth,
}: AddCommentModalProps) {
  return (
    <Modal
      centered
      onClose={close}
      opened={opened}
      overlayProps={modalProps.overlayProps}>
      <AddCommentForm bookId={bookId} close={close} auth={auth} />
    </Modal>
  );
}
