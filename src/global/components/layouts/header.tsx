"use client";
import {
  homeRoute,
  purchaseRoute,
  subscribeRoute,
} from "@/global/constants/routes";
import Link from "next/link";
import { Session } from "next-auth";
import classes from "@/global/styles/app.module.css";
import { IconAppsFilled } from "@tabler/icons-react";
import { stillButtonProps } from "@/global/constants";
import { Avatar, Button, Group, Text, Title } from "@mantine/core";
import { ThemeButton, SearchInput, BurgerButton, SearchIcon } from "../common";
import { sendEmail } from "@/features/user/action";

type HeaderProps = {
  opened: boolean;
  toggle: () => void;
  pathname: string;
  session?: Session | null;
};

export default function Header({
  opened,
  toggle,
  pathname,
  session,
}: HeaderProps) {
  const id = session?.user?.id;
  const name = session?.user?.name || undefined;
  const image = session?.user?.image || undefined;

  const AvatarComp = () => {
    if (!session) return <></>;
    if (id && !image) return <Avatar name={name} color="initials" size="sm" />;
    if (id && image) return <Avatar src={image} alt="Avatar" size="sm" />;
  };

  return (
    <Group justify="space-between" h="100%" px="md" align="center">
      <Group gap="xs">
        <Button
          p={0}
          c="var(--tx-one)"
          bg="transparent"
          leftSection={<IconAppsFilled size={32} color="var(--tx-one)" />}
          href={homeRoute}
          component={Link}
          style={stillButtonProps.style}
          onFocus={stillButtonProps.onFocus}
          onMouseDown={stillButtonProps.onMouseDown}>
          <Title order={5}>Test App</Title>
        </Button>
      </Group>

      <Group>
        <Button onClick={async () => await sendEmail("", {}, {})}>
          Send Email
        </Button>

        <SearchInput placeholder="Search..." />

        <SearchIcon />

        <ThemeButton />

        <BurgerButton opened={opened} toggle={toggle} />

        <Group visibleFrom="sm" gap={0}>
          <Button
            size="input-sm"
            href={homeRoute}
            component={Link}
            style={stillButtonProps.style}
            onFocus={stillButtonProps.onFocus}
            onMouseDown={stillButtonProps.onMouseDown}
            className={`${classes.themeOneWithHover} ${
              pathname === homeRoute && classes.themeThree
            }`}>
            <Text size="sm">Home</Text>
          </Button>

          <Button
            size="input-sm"
            href={subscribeRoute}
            component={Link}
            style={stillButtonProps.style}
            onFocus={stillButtonProps.onFocus}
            onMouseDown={stillButtonProps.onMouseDown}
            className={`${classes.themeOneWithHover} ${
              pathname === subscribeRoute && classes.themeThree
            }`}>
            <Text size="sm">Subscribe</Text>
          </Button>

          <Button
            size="input-sm"
            href={purchaseRoute}
            component={Link}
            style={stillButtonProps.style}
            onFocus={stillButtonProps.onFocus}
            onMouseDown={stillButtonProps.onMouseDown}
            className={`${classes.themeOneWithHover} ${
              pathname === purchaseRoute && classes.themeThree
            }`}>
            <Text size="sm">Purchase</Text>
          </Button>

          <AvatarComp />
        </Group>
      </Group>
    </Group>
  );
}
