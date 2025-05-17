"use client";
import { Drawer } from "@mantine/core";
import AddCommentForm from "./add-comment-form";
import { drawerProps } from "@/global/constants";

type BooksFilterDrawerProps = {
  bookId: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  opened: boolean;
  close: () => void;
};

export default function AddCommentDrawer({
  bookId,
  size = "xs",
  close,
  opened,
}: BooksFilterDrawerProps) {
  return (
    <Drawer
      size={size}
      zIndex={201}
      opened={opened}
      onClose={close}
      position="bottom"
      styles={drawerProps.styles}>
      <AddCommentForm bookId={bookId} />
    </Drawer>
  );
}
