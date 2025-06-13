"use client";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout } from "@tabler/icons-react";
import { Button, Group, Text } from "@mantine/core";
import { signOutUser } from "@/features/user/action";
import classes from "@/global/styles/app.module.css";
import { signInRoute } from "@/global/constants/routes";
import { stillButtonProps } from "@/global/constants";
import { NewModal } from "@/global/components/common/client";

export default function SignOutNavbarButton() {
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
        h={40}
        onClick={open}
        visibleFrom="sm"
        style={stillButtonProps.style}
        onFocus={stillButtonProps.onFocus}
        onMouseDown={stillButtonProps.onMouseDown}
        className={`${classes.themeOneWithHover}`}>
        <Group align="center" justify="center" gap="xs">
          <IconLogout size={16} />
          <Text size="sm">Sign Out</Text>
        </Group>
      </Button>

      <Button
        p={4}
        h={60}
        onClick={open}
        hiddenFrom="sm"
        style={stillButtonProps.style}
        onFocus={stillButtonProps.onFocus}
        onMouseDown={stillButtonProps.onMouseDown}
        className={`${classes.themeOneWithHover}`}>
        <Group align="center" justify="center" gap="xs">
          <IconLogout size={16} />
          <Text size="sm">Sign Out</Text>
        </Group>
      </Button>
    </>
  );
}
