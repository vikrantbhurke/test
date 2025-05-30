"use client";
import { Button } from "@mantine/core";
import { dropBookById } from "../action";
import { useDisclosure } from "@mantine/hooks";
import { CustomModal } from "@/global/components/common";
import { booksRoute } from "@/global/constants/routes";

type DropBookButtonProps = {
  id: string;
};

export default function DropBookButton({ id }: DropBookButtonProps) {
  const [opened, { open, close }] = useDisclosure();

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
        route={booksRoute}
        routeType="push"
        action={async () => await dropBookById(id)}
        message="Are you sure you want to delete this book?"
      />

      <Button color="red" onClick={open} size="xs" fz="xs">
        Delete
      </Button>
    </>
  );
}
