import {
  homeRoute,
  purchaseRoute,
  subscribeRoute,
} from "@/global/constants/routes";
import Link from "next/link";
import { Button, Group, Text, Title } from "@mantine/core";
import classes from "@/global/styles/app.module.css";
import { stillButtonProps } from "@/global/constants";
import { ThemeButton, SearchInput, BurgerButton, SearchIcon } from "../common";
import { IconAppsFilled } from "@tabler/icons-react";

type HeaderProps = {
  opened: boolean;
  toggle: () => void;
  pathname: string;
};

export default function Header({ opened, toggle, pathname }: HeaderProps) {
  return (
    <Group justify="space-between" h="100%" px="md" align="center">
      <Group gap="xs">
        <IconAppsFilled size={32} color="var(--tx-one)" />
        <Title order={5}>Test App</Title>
      </Group>

      <Group>
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
        </Group>
      </Group>
    </Group>
  );
}
