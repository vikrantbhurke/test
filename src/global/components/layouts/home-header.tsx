"use client";
import {
  AppName,
  SearchIcon,
  ThemeButton,
  SearchInput,
  InstallAppButton,
} from "../common/client";
import { Navbar } from "./navbar";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { AvatarNew } from "@/features/user/views/client";
import { Box, Burger, Drawer, Group, Modal, Space } from "@mantine/core";

type HomeHeaderProps = {
  auth?: any;
};

export function HomeHeader({ auth }: HomeHeaderProps) {
  const pathname = usePathname();

  const [drawerOpened, { toggle: drawerToggle, close: drawerClose }] =
    useDisclosure(false);

  const [modalOpened, { toggle: modalToggle, close: modalClose }] =
    useDisclosure(false);

  useEffect(() => {
    drawerClose();
    modalClose();
  }, [pathname, drawerClose, modalClose]);

  const border = "1px solid var(--tx-one)";

  return (
    <Group h="100%" w="100%" px="md" align="center" justify="space-between">
      <Box component="div" hiddenFrom="xl">
        <AppName />
      </Box>

      <Space />
      <SearchInput placeholder="Search..." />

      <Group>
        <SearchIcon />
        <ThemeButton />
        <InstallAppButton />

        <Burger
          opened={drawerOpened}
          onClick={drawerToggle}
          hiddenFrom="sm"
          size="sm"
        />
        <Burger
          opened={modalOpened}
          onClick={modalToggle}
          visibleFrom="sm"
          hiddenFrom="xl"
          size="sm"
        />

        <AvatarNew auth={auth} />
      </Group>

      <Drawer
        size="xs"
        onClose={drawerClose}
        opened={drawerOpened}
        mah="100vh"
        styles={{
          content: {
            borderRight: border,
          },
        }}>
        <Navbar pathname={pathname} auth={auth} />
      </Drawer>

      <Modal
        opened={modalOpened}
        onClose={modalClose}
        centered
        mah="100vh"
        styles={{
          content: { border },
        }}>
        <Navbar pathname={pathname} auth={auth} />
      </Modal>
    </Group>
  );
}
