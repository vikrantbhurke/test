"use client";
import { signOutUser } from "@/features/user/action";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout } from "@tabler/icons-react";
import { Button, Stack, Text } from "@mantine/core";
import { signInRoute } from "@/global/constants/routes";
import { stillButtonProps } from "@/global/constants";
import classes from "@/global/styles/app.module.css";
import { NewModal } from "@/global/components/common/client";

export default function SignOutFooterButton() {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <NewModal
        buttonProps={{
          fullWidth: true,
          c: "var(--bg-one)",
          color: "var(--tx-one)",
          loaderProps: { type: "dots", color: "var(--bg-one)" },
        }}
        close={close}
        opened={opened}
        buttonLabel="Sign Out"
        route={signInRoute}
        routeType="replace"
        action={async () => await signOutUser()}
        message="Are you sure you want to sign out?"
      />

      <Button
        p={4}
        h="100%"
        onClick={open}
        aria-label="Sign Out"
        style={stillButtonProps.style}
        onFocus={stillButtonProps.onFocus}
        onMouseDown={stillButtonProps.onMouseDown}
        className={`${classes.themeOneWithHover}`}>
        <Stack align="center" justify="center" gap={0}>
          <IconLogout size={16} />
          <Text size="sm">Sign Out</Text>
        </Stack>
      </Button>
    </>
  );
}
