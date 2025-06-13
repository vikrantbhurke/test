"use client";
import Link from "next/link";
import { Clear } from "../common/client";
import { SearchButton } from "../common/client";
import { Button, Group, Stack, Text } from "@mantine/core";
import classes from "@/global/styles/app.module.css";
import { IconBook, IconHome, IconLogin } from "@tabler/icons-react";
import {
  homeRoute,
  booksServerWindowRoute,
  signInRoute,
  startsWithBooksServerWindow,
} from "@/global/constants/routes";
import { stillButtonProps } from "@/global/constants";
import { SignOutFooterButton } from "@/features/user/views/client";
import { Clearance } from "@/features/user/enums/clearance";

type FooterProps = {
  pathname: string;
};

export default function Footer({ pathname }: FooterProps) {
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

      <Clear
        level={Clearance.LevelTwo}
        one={<SignOutFooterButton />}
        two={
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
        }
      />
    </Group>
  );
}
