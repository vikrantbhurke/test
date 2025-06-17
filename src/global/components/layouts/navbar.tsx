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
  booksServerWindowRoute,
  signInRoute,
  signUpRoute,
  saveBookRoute,
  startsWithBooksServerWindow,
  booksServerContainerRoute,
  booksClientWindowRoute,
  booksClientContainerRoute,
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
import { Clear } from "../common/client";
import { Clearance } from "@/features/user/enums/clearance";
import { GetSession } from "@/features/user/queries/client";

type NavbarProps = {
  pathname: string;
};

export default function Navbar({ pathname }: NavbarProps) {
  const NavbarButton = ({ href, className, Icon, label }: any) => {
    return (
      <>
        <Button
          p={4}
          h={40}
          href={href}
          visibleFrom="sm"
          component={Link}
          aria-label={label}
          style={stillButtonProps.style}
          onFocus={stillButtonProps.onFocus}
          onMouseDown={stillButtonProps.onMouseDown}
          className={`${classes.themeOneWithHover} ${className}`}>
          <Group align="center" justify="center" gap="xs">
            {Icon}
            <Text size="sm">{label}</Text>
          </Group>
        </Button>

        <Button
          p={4}
          h={60}
          href={href}
          hiddenFrom="sm"
          component={Link}
          aria-label={label}
          style={stillButtonProps.style}
          onFocus={stillButtonProps.onFocus}
          onMouseDown={stillButtonProps.onMouseDown}
          className={`${classes.themeOneWithHover} ${className}`}>
          <Group align="center" justify="center" gap="xs">
            {Icon}
            <Text size="sm">{label}</Text>
          </Group>
        </Button>
      </>
    );
  };

  return (
    <Stack gap={0} px="xs">
      <NavbarButton
        href={homeRoute}
        className={pathname === homeRoute && classes.themeThree}
        Icon={<IconHome size={16} />}
        label="Home"
      />

      <NavbarButton
        href={booksServerWindowRoute}
        className={
          pathname.startsWith(startsWithBooksServerWindow) && classes.themeThree
        }
        Icon={<IconBook size={16} />}
        label="Books Server Window"
      />

      <NavbarButton
        href={booksServerContainerRoute}
        className={
          pathname.startsWith(startsWithBooksServerContainer) &&
          classes.themeThree
        }
        Icon={<IconBook size={16} />}
        label="Books Server Container"
      />

      <NavbarButton
        href={booksClientWindowRoute}
        className={
          pathname.startsWith(startsWithBooksClientWindow) && classes.themeThree
        }
        Icon={<IconBook size={16} />}
        label="Books Client Window"
      />

      <NavbarButton
        href={booksClientContainerRoute}
        className={
          pathname.startsWith(startsWithBooksClientContainer) &&
          classes.themeThree
        }
        Icon={<IconBook size={16} />}
        label="Books Client Container"
      />

      <Clear
        level={Clearance.LevelTwo}
        compOne={
          <GetSession>
            {(session) => (
              <>
                <NavbarButton
                  href={saveBookRoute}
                  className={pathname === saveBookRoute && classes.themeThree}
                  Icon={<IconPencil size={16} />}
                  label="Create Book"
                />

                <SignOutNavbarButton />

                {session && <DeleteAccountButton id={session.user.id} />}
              </>
            )}
          </GetSession>
        }
        compTwo={
          <>
            <NavbarButton
              href={signUpRoute}
              className={pathname.startsWith(signUpRoute) && classes.themeThree}
              Icon={<IconAppWindow size={16} />}
              label="Sign Up"
            />

            <NavbarButton
              href={signInRoute}
              className={pathname.startsWith(signInRoute) && classes.themeThree}
              Icon={<IconLogin size={16} />}
              label="Sign In"
            />
          </>
        }
      />
    </Stack>
  );
}
