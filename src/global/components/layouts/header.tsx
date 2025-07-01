"use client";
import {
  SearchIcon,
  ThemeButton,
  SearchInput,
  BurgerButton,
} from "../common/client";
import Link from "next/link";
import { useInstallApp } from "@/global/hooks";
import classes from "@/global/styles/app.module.css";
import { homeRoute } from "@/global/constants/routes";
import { stillButtonProps } from "@/global/constants";
import { AvatarNew } from "@/features/user/views/client";
import { IconAppsFilled, IconDownload } from "@tabler/icons-react";
import { ActionIcon, Button, Group, Text, Title } from "@mantine/core";

type HeaderProps = {
  auth?: any;
  opened: boolean;
  toggle: () => void;
  pathname: string;
};

export function Header({ auth, opened, toggle, pathname }: HeaderProps) {
  const { installPrompt, isInstalled, handleInstallClick } = useInstallApp();

  return (
    <Group justify="space-between" h="100%" px="md" align="center">
      <Group gap="xs">
        <Button
          p={0}
          c="var(--tx-one)"
          bg="transparent"
          aria-label="Test App"
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
        <SearchInput placeholder="Search..." />

        {!isInstalled && installPrompt && (
          <>
            <Button
              visibleFrom="md"
              onClick={handleInstallClick}
              leftSection={<IconDownload size={16} />}
              aria-label="Install App">
              Install App
            </Button>

            <ActionIcon
              hiddenFrom="md"
              onClick={handleInstallClick}
              title="Install App"
              aria-label="Install App">
              <IconDownload size={16} />
            </ActionIcon>
          </>
        )}

        <SearchIcon />

        <ThemeButton />

        <BurgerButton opened={opened} toggle={toggle} />

        <Group visibleFrom="md">
          <Button
            size="input-sm"
            href={homeRoute}
            component={Link}
            aria-label="Home"
            style={stillButtonProps.style}
            onFocus={stillButtonProps.onFocus}
            onMouseDown={stillButtonProps.onMouseDown}
            className={`${classes.themeOneWithHover} ${
              pathname === homeRoute && classes.themeThree
            }`}>
            <Text size="sm">Home</Text>
          </Button>

          <AvatarNew auth={auth} />
        </Group>
      </Group>
    </Group>
  );
}
