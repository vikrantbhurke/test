"use client";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { dropBookById } from "@/features/book/action";
import { NewModal } from "@/global/components/common/client";
import { booksServerWindowRoute } from "@/global/constants/routes";

type DropBookButtonProps = {
  id: string;
};

export default function DropBookButton({ id }: DropBookButtonProps) {
  const [opened, { open, close }] = useDisclosure();

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
        route={booksServerWindowRoute}
        routeType="push"
        action={async () => await dropBookById(id)}
        message="Are you sure you want to delete this book?"
      />

      <Button
        color="red"
        onClick={open}
        aria-label="Delete Book"
        size="xs"
        fz="xs">
        Delete
      </Button>
    </>
  );
}
