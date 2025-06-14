"use client";
import {
  SearchIcon,
  ThemeButton,
  SearchInput,
  BurgerButton,
} from "../common/client";
import Link from "next/link";
import { AvatarNew } from "@/features/user/views/client";
import classes from "@/global/styles/app.module.css";
import { IconAppsFilled, IconDownload } from "@tabler/icons-react";
import { stillButtonProps } from "@/global/constants";
import { homeRoute } from "@/global/constants/routes";
import { GetSession } from "@/features/user/queries/client";
import { ActionIcon, Button, Group, Text, Title } from "@mantine/core";
import { useInstallApp } from "@/global/hooks";

type HeaderProps = {
  opened: boolean;
  toggle: () => void;
  pathname: string;
};

export default function Header({ opened, toggle, pathname }: HeaderProps) {
  const { installPrompt, isInstalled, handleInstallClick } = useInstallApp();

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
        <SearchInput placeholder="Search..." />

        {!isInstalled && installPrompt && (
          <>
            <Button
              visibleFrom="sm"
              onClick={handleInstallClick}
              leftSection={<IconDownload size={16} />}>
              Install App
            </Button>

            <ActionIcon
              hiddenFrom="sm"
              onClick={handleInstallClick}
              title="Install App">
              <IconDownload size={16} />
            </ActionIcon>
          </>
        )}

        <SearchIcon />

        <ThemeButton />

        <BurgerButton opened={opened} toggle={toggle} />

        <Group visibleFrom="sm">
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

          <GetSession>
            {(session) => <AvatarNew session={session} />}
          </GetSession>
        </Group>
      </Group>
    </Group>
  );
}
