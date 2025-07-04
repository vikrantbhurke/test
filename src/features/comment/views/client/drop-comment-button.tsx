"use client";
import { Button } from "@mantine/core";
import { dropCommentById } from "@/features";
import { useDisclosure } from "@mantine/hooks";
import { NewModal } from "@/global/components/common/client";

type DropCommentButtonProps = {
  id: string;
};

export function DropCommentButton({ id }: DropCommentButtonProps) {
  const [opened, { open, close }] = useDisclosure();

  const handleDropComment = async () => {
    return await dropCommentById(id);
  };

  return (
    <>
      <NewModal
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

      <Button
        color="red"
        onClick={open}
        size="xs"
        fz="xs"
        aria-label="Delete Comment">
        Delete
      </Button>
    </>
  );
}
