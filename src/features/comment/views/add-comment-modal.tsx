"use client";
import { Modal } from "@mantine/core";
import { modalProps } from "@/global/constants";
import AddCommentForm from "./add-comment-form";
import { Session } from "next-auth";

type AddCommentModalProps = {
  bookId: string;
  opened: boolean;
  close: () => void;
  session?: Session | null;
};

export default function AddCommentModal({
  bookId,
  close,
  opened,
  session,
}: AddCommentModalProps) {
  return (
    <Modal
      centered
      onClose={close}
      opened={opened}
      overlayProps={modalProps.overlayProps}>
      <AddCommentForm bookId={bookId} close={close} session={session} />
    </Modal>
  );
}
