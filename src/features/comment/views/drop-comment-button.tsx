"use client";
import { Button } from "@mantine/core";
import { dropCommentById } from "../action";
import { useDisclosure } from "@mantine/hooks";
import { CustomModal } from "@/global/components/common";

type DropCommentButtonProps = {
  id: string;
};

export default function DropCommentButton({ id }: DropCommentButtonProps) {
  const [opened, { open, close }] = useDisclosure();

  const handleDropComment = async () => {
    return await dropCommentById(id);
  };

  return (
    <>
      <CustomModal
        buttonProps={{
          color: "red",
          fullWidth: true,
          loaderProps: { type: "dots" },
        }}
        close={close}
        opened={opened}
        buttonLabel="Delete"
        action={handleDropComment}
        routeType="refresh"
        message="Are you sure you want to delete this comment?"
      />

      <Button color="red" onClick={open} size="xs" fz="xs">
        Delete
      </Button>
    </>
  );
}
