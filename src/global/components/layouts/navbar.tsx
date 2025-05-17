import Link from "next/link";
import { Button, Group, Stack, Text } from "@mantine/core";
import {
  booksRoute,
  saveBookRoute,
  homeRoute,
  purchaseRoute,
  signInRoute,
  signUpRoute,
  subscribeRoute,
  booksStartsWith,
} from "@/global/constants/routes";
import {
  IconBook,
  IconCoin,
  IconHome,
  IconLogin,
  IconPencil,
  IconAppWindow,
} from "@tabler/icons-react";
import classes from "@/global/styles/app.module.css";
import { stillButtonProps } from "@/global/constants";

type NavbarProps = {
  pathname: string;
};

export default function Navbar({ pathname }: NavbarProps) {
  const DesktopButton = ({ href, className, Icon, label }: any) => {
    return (
      <Button
        p={4}
        h={40}
        href={href}
        visibleFrom="sm"
        component={Link}
        style={stillButtonProps.style}
        onFocus={stillButtonProps.onFocus}
        onMouseDown={stillButtonProps.onMouseDown}
        className={`${classes.themeOneWithHover} ${className}`}>
        <Group align="center" justify="center" gap="xs">
          {Icon}
          <Text size="sm">{label}</Text>
        </Group>
      </Button>
    );
  };

  const MobileButton = ({ href, className, Icon, label }: any) => {
    return (
      <Button
        p={4}
        h={60}
        href={href}
        hiddenFrom="sm"
        component={Link}
        style={stillButtonProps.style}
        onFocus={stillButtonProps.onFocus}
        onMouseDown={stillButtonProps.onMouseDown}
        className={`${classes.themeOneWithHover} ${className}`}>
        <Group align="center" justify="center" gap="xs">
          {Icon}
          <Text size="sm">{label}</Text>
        </Group>
      </Button>
    );
  };

  return (
    <Stack gap={0} px="xs">
      <DesktopButton
        href={homeRoute}
        className={pathname === homeRoute && classes.themeThree}
        Icon={<IconHome size={16} />}
        label="Home"
      />

      <MobileButton
        href={homeRoute}
        className={pathname === homeRoute && classes.themeThree}
        Icon={<IconHome size={16} />}
        label="Home"
      />

      <DesktopButton
        href={booksRoute}
        className={pathname.startsWith(booksStartsWith) && classes.themeThree}
        Icon={<IconBook size={16} />}
        label="Books Server Window"
      />

      <MobileButton
        href={booksRoute}
        className={pathname.startsWith(booksStartsWith) && classes.themeThree}
        Icon={<IconBook size={16} />}
        label="Books Server Window"
      />

      <DesktopButton
        href={"/books/server/container/page/1?sort=title&order=Asc&genre=All"}
        className={
          pathname.startsWith("/books/server/container") && classes.themeThree
        }
        Icon={<IconBook size={16} />}
        label="Books Server Container"
      />

      <MobileButton
        href={"/books/server/container/page/1?sort=title&order=Asc&genre=All"}
        className={
          pathname.startsWith("/books/server/container") && classes.themeThree
        }
        Icon={<IconBook size={16} />}
        label="Books Server Container"
      />

      <DesktopButton
        href={"/books/client/container/page/1?sort=title&order=Asc&genre=All"}
        className={
          pathname.startsWith("/books/client/container") && classes.themeThree
        }
        Icon={<IconBook size={16} />}
        label="Books Client Container"
      />

      <MobileButton
        href={"/books/client/container/page/1?sort=title&order=Asc&genre=All"}
        className={
          pathname.startsWith("/books/client/container") && classes.themeThree
        }
        Icon={<IconBook size={16} />}
        label="Books Client Container"
      />

      <DesktopButton
        href={"/books/client/window/page/1?sort=title&order=Asc&genre=All"}
        className={
          pathname.startsWith("/books/client/window") && classes.themeThree
        }
        Icon={<IconBook size={16} />}
        label="Books Client Window"
      />

      <MobileButton
        href={"/books/client/window/page/1?sort=title&order=Asc&genre=All"}
        className={
          pathname.startsWith("/books/client/window") && classes.themeThree
        }
        Icon={<IconBook size={16} />}
        label="Books Client Window"
      />

      <DesktopButton
        href={saveBookRoute}
        className={pathname === saveBookRoute && classes.themeThree}
        Icon={<IconPencil size={16} />}
        label="Create Book"
      />

      <MobileButton
        href={saveBookRoute}
        className={pathname === saveBookRoute && classes.themeThree}
        Icon={<IconPencil size={16} />}
        label="Create Book"
      />

      <DesktopButton
        href={subscribeRoute}
        className={pathname.startsWith(subscribeRoute) && classes.themeThree}
        Icon={<IconCoin size={16} />}
        label="Subscribe"
      />

      <MobileButton
        href={subscribeRoute}
        className={pathname.startsWith(subscribeRoute) && classes.themeThree}
        Icon={<IconCoin size={16} />}
        label="Subscribe"
      />

      <DesktopButton
        href={purchaseRoute}
        className={pathname.startsWith(purchaseRoute) && classes.themeThree}
        Icon={<IconCoin size={16} />}
        label="Purchase"
      />

      <MobileButton
        href={purchaseRoute}
        className={pathname.startsWith(purchaseRoute) && classes.themeThree}
        Icon={<IconCoin size={16} />}
        label="Purchase"
      />

      <DesktopButton
        href={signInRoute}
        className={pathname.startsWith(signInRoute) && classes.themeThree}
        Icon={<IconLogin size={16} />}
        label="Sign In"
      />

      <MobileButton
        href={signInRoute}
        className={pathname.startsWith(signInRoute) && classes.themeThree}
        Icon={<IconLogin size={16} />}
        label="Sign In"
      />

      <DesktopButton
        href={signUpRoute}
        className={pathname.startsWith(signUpRoute) && classes.themeThree}
        Icon={<IconAppWindow size={16} />}
        label="Sign Up"
      />

      <MobileButton
        href={signUpRoute}
        className={pathname.startsWith(signUpRoute) && classes.themeThree}
        Icon={<IconAppWindow size={16} />}
        label="Sign Up"
      />
    </Stack>
  );
}
