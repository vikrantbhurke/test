"use client";
import { Drawer } from "@mantine/core";
import AddCommentForm from "./add-comment-form";
import { drawerProps } from "@/global/constants";

type BooksFilterDrawerProps = {
  bookId: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  title: string;
  opened: boolean;
  close: () => void;
};

export default function AddCommentDrawer({
  bookId,
  size = "xs",
  title,
  close,
  opened,
}: BooksFilterDrawerProps) {
  return (
    <Drawer
      size={size}
      zIndex={201}
      title={title}
      opened={opened}
      onClose={close}
      position="bottom"
      styles={drawerProps.styles}>
      <AddCommentForm bookId={bookId} />
    </Drawer>
  );
}
