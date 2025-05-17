"use client";
import { Button } from "@mantine/core";
import { dropUserById } from "../action";
import { useDisclosure } from "@mantine/hooks";
import { CustomModal } from "@/global/components/common";
import { signUpRoute } from "@/global/constants/routes";

type DeleteAccountButtonProps = {
  id: string;
};

export default function DeleteAccountButton({ id }: DeleteAccountButtonProps) {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <CustomModal
        close={close}
        buttonColor="red"
        opened={opened}
        loaderType="dots"
        buttonLabel="Delete Account"
        route={signUpRoute}
        action={async () => await dropUserById(id)}
        message="Are you sure you want to delete your account?"
      />

      <Button color="red" onClick={open} size="xs" fz="xs">
        Delete Account
      </Button>
    </>
  );
}
