"use client";
import { dropUserById } from "@/features";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { Button, Group, Text } from "@mantine/core";
import classes from "@/global/styles/app.module.css";
import { stillButtonProps } from "@/global/constants";
import { signUpRoute } from "@/global/constants/routes";
import { NewModal } from "@/global/components/common/client";

type DeleteAccountButtonProps = {
  id: string;
};

export function DeleteAccountButton({ id }: DeleteAccountButtonProps) {
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
        buttonLabel="Delete Account"
        route={signUpRoute}
        routeType="replace"
        action={async () => await dropUserById(id)}
        message="Are you sure you want to delete your account?"
      />

      <Button
        p={4}
        h={50}
        onClick={open}
        aria-label="Delete Account"
        style={stillButtonProps.style}
        onFocus={stillButtonProps.onFocus}
        onMouseDown={stillButtonProps.onMouseDown}
        className={`${classes.themeOneWithHover}`}>
        <Group align="center" justify="center" gap="xs">
          <IconTrash size={20} />
          <Text fz="lg" fw="bold">
            Delete Account
          </Text>
        </Group>
      </Button>
    </>
  );
}
