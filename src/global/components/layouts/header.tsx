import {
  homeRoute,
  purchaseRoute,
  subscribeRoute,
} from "@/global/constants/routes";
import Link from "next/link";
import { Button, Group, Text } from "@mantine/core";
import classes from "@/global/styles/app.module.css";
import { stillButtonProps } from "@/global/constants";
import { ThemeButton, SearchInput, BurgerButton, SearchIcon } from "../common";

type HeaderProps = {
  opened: boolean;
  toggle: () => void;
  pathname: string;
};

export default function Header({ opened, toggle, pathname }: HeaderProps) {
  return (
    <Group justify="end" h="100%" px="md" align="center">
      <SearchInput placeholder="Search..." />
      <SearchIcon />
      <ThemeButton />
      <BurgerButton opened={opened} toggle={toggle} />

      <Group visibleFrom="sm" gap={0}>
        <Button
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
  );
}
