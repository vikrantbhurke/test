"use client";
import Link from "next/link";
import {
  IconBook,
  IconHome,
  IconLogin,
  IconPencil,
  IconAppWindow,
} from "@tabler/icons-react";
import {
  homeRoute,
  signInRoute,
  signUpRoute,
  saveBookRoute,
  booksServerWindowRoute,
  booksClientWindowRoute,
  booksClientContainerRoute,
  booksServerContainerRoute,
  startsWithBooksServerWindow,
  startsWithBooksClientWindow,
  startsWithBooksServerContainer,
  startsWithBooksClientContainer,
} from "@/global/constants/routes";
import {
  DeleteAccountButton,
  SignOutNavbarButton,
} from "@/features/user/views/client";
import classes from "@/global/styles/app.module.css";
import { stillButtonProps } from "@/global/constants";
import { Button, Group, Stack, Text } from "@mantine/core";
import { Clearance } from "@/features/user/enums/clearance";

type NavbarProps = {
  auth: any;
  pathname: string;
};

export function Navbar({ pathname, auth }: NavbarProps) {
  const NavbarButton = ({ href, className, Icon, label }: any) => {
    return (
      <Button
        p={4}
        h={50}
        href={href}
        component={Link}
        aria-label={label}
        style={stillButtonProps.style}
        onFocus={stillButtonProps.onFocus}
        onMouseDown={stillButtonProps.onMouseDown}
        className={`${classes.themeOneWithHover} ${className}`}>
        <Group align="center" justify="center" gap="xs" p="sm">
          {Icon}
          <Text fz="lg" fw="bold">
            {label}
          </Text>
        </Group>
      </Button>
    );
  };

  const nav = (
    <>
      <NavbarButton
        href={homeRoute}
        className={pathname === homeRoute && classes.themeThree}
        Icon={<IconHome size={20} />}
        label="Home"
      />
      <NavbarButton
        href={booksServerWindowRoute}
        className={
          pathname.startsWith(startsWithBooksServerWindow) && classes.themeThree
        }
        Icon={<IconBook size={20} />}
        label="Books SW"
      />
      <NavbarButton
        href={booksServerContainerRoute}
        className={
          pathname.startsWith(startsWithBooksServerContainer) &&
          classes.themeThree
        }
        Icon={<IconBook size={20} />}
        label="Books SC"
      />
      <NavbarButton
        href={booksClientWindowRoute}
        className={
          pathname.startsWith(startsWithBooksClientWindow) && classes.themeThree
        }
        Icon={<IconBook size={20} />}
        label="Books CW"
      />
      <NavbarButton
        href={booksClientContainerRoute}
        className={
          pathname.startsWith(startsWithBooksClientContainer) &&
          classes.themeThree
        }
        Icon={<IconBook size={20} />}
        label="Books CC"
      />
      {Clearance.LevelTwo.includes(auth.role) ? (
        <>
          <NavbarButton
            href={saveBookRoute}
            className={pathname === saveBookRoute && classes.themeThree}
            Icon={<IconPencil size={20} />}
            label="Create Book"
          />

          <SignOutNavbarButton />
          <DeleteAccountButton id={auth.id} />
        </>
      ) : (
        <>
          <NavbarButton
            href={signUpRoute}
            className={pathname.startsWith(signUpRoute) && classes.themeThree}
            Icon={<IconAppWindow size={20} />}
            label="Sign Up"
          />

          <NavbarButton
            href={signInRoute}
            className={pathname.startsWith(signInRoute) && classes.themeThree}
            Icon={<IconLogin size={20} />}
            label="Sign In"
          />
        </>
      )}
    </>
  );

  return (
    <>
      <Stack visibleFrom="sm" align="flex-end" p="sm">
        <Stack visibleFrom="sm" px="xs" align="flex-start">
          {nav}
        </Stack>
      </Stack>

      <Stack hiddenFrom="sm" p="sm">
        {nav}
      </Stack>
    </>
  );
}
