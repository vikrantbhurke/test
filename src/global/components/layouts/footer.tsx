"use client";
import {
  homeRoute,
  signInRoute,
  booksServerWindowRoute,
  startsWithBooksServerWindow,
} from "@/global/constants/routes";
import Link from "next/link";
import { SearchButton } from "../common/client";
import classes from "@/global/styles/app.module.css";
import { stillButtonProps } from "@/global/constants";
import { Button, Group, Stack, Text } from "@mantine/core";
import { Clearance } from "@/features/user/enums/clearance";
import { IconBook, IconHome, IconLogin } from "@tabler/icons-react";
import { SignOutFooterButton } from "@/features/user/views/client";

type FooterProps = {
  auth?: any;
  pathname: string;
};

export function Footer({ pathname, auth }: FooterProps) {
  return (
    <Group grow h="100%" gap={4} p={4}>
      <Button
        p={4}
        h="100%"
        href={homeRoute}
        component={Link}
        aria-label="Home"
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
        aria-label="Books"
        href={booksServerWindowRoute}
        component={Link}
        style={stillButtonProps.style}
        onFocus={stillButtonProps.onFocus}
        onMouseDown={stillButtonProps.onMouseDown}
        className={`${classes.themeOneWithHover} ${
          pathname.startsWith(startsWithBooksServerWindow) && classes.themeThree
        }`}>
        <Stack align="center" justify="center" gap={0}>
          <IconBook size={16} />
          <Text size="sm">Books</Text>
        </Stack>
      </Button>

      {Clearance.LevelTwo.includes(auth.role) ? (
        <SignOutFooterButton />
      ) : (
        <Button
          p={4}
          h="100%"
          href={signInRoute}
          component={Link}
          aria-label="Sign In"
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
      )}
    </Group>
  );
}
