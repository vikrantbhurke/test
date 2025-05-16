import Link from "next/link";
import { SearchButton } from "../common";
import { Button, Group, Stack, Text } from "@mantine/core";
import classes from "@/global/styles/app.module.css";
import { IconBook, IconHome, IconLogin } from "@tabler/icons-react";
import {
  homeRoute,
  booksRoute,
  signInRoute,
  booksStartsWith,
} from "@/global/constants/routes";
import { stillButtonProps } from "@/global/constants";

type NavbarProps = {
  pathname: string;
};

export default function Footer({ pathname }: NavbarProps) {
  return (
    <Group grow h="100%" gap={4} p={4}>
      <Button
        p={4}
        h="100%"
        href={homeRoute}
        component={Link}
        style={stillButtonProps.style}
        onFocus={stillButtonProps.onFocus}
        onMouseDown={stillButtonProps.onMouseDown}
        className={`${classes.themeOneWithHover} ${
          pathname === homeRoute && classes.themeThree
        }`}>
        <Stack align="center" justify="center" gap={0}>
          <IconHome size={16} />
          <Text size="sm">Home</Text>
        </Stack>
      </Button>

      <SearchButton />

      <Button
        p={4}
        h="100%"
        href={booksRoute}
        component={Link}
        style={stillButtonProps.style}
        onFocus={stillButtonProps.onFocus}
        onMouseDown={stillButtonProps.onMouseDown}
        className={`${classes.themeOneWithHover} ${
          pathname.startsWith(booksStartsWith) && classes.themeThree
        }`}>
        <Stack align="center" justify="center" gap={0}>
          <IconBook size={16} />
          <Text size="sm">Books</Text>
        </Stack>
      </Button>

      <Button
        p={4}
        h="100%"
        href={signInRoute}
        component={Link}
        style={stillButtonProps.style}
        onFocus={stillButtonProps.onFocus}
        onMouseDown={stillButtonProps.onMouseDown}
        className={`${classes.themeOneWithHover} ${
          pathname === signInRoute && classes.themeThree
        }`}>
        <Stack align="center" justify="center" gap={0}>
          <IconLogin size={16} />
          <Text size="sm">Sign In</Text>
        </Stack>
      </Button>
    </Group>
  );
}
