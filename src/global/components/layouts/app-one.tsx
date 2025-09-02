"use client";
import { Main } from "./main";
import { Aside } from "./aside";
import { Navbar } from "./navbar";
import { Header } from "./header";
import { Footer } from "./footer";
import { useEffect } from "react";
import { AppShell } from "@mantine/core";
import { useViewInfo } from "@/global/hooks";
import { usePathname } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import classes from "@/global/styles/app.module.css";
import { appShellProps } from "@/global/constants";

type AppOneProps = {
  auth: any;
  children: React.ReactNode;
};

export function AppOne({ children, auth }: AppOneProps) {
  useViewInfo();
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure();
  useEffect(() => close(), [pathname, close]);

  return (
    <AppShell
      withBorder={false}
      aside={appShellProps.aside}
      footer={appShellProps.footer}
      header={appShellProps.header}
      navbar={appShellProps.navbar(opened)}
      h="100vh">
      <AppShell.Header className={`${classes.blurBg}`}>
        <Header
          opened={opened}
          toggle={toggle}
          pathname={pathname}
          auth={auth}
        />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar pathname={pathname} auth={{ id: auth.id, role: auth.role }} />
      </AppShell.Navbar>

      <AppShell.Aside>
        <Aside />
      </AppShell.Aside>

      <AppShell.Main h="100%">
        <Main>{children}</Main>
      </AppShell.Main>

      <AppShell.Footer>
        <Footer pathname={pathname} auth={{ role: auth.role }} />
      </AppShell.Footer>
    </AppShell>
  );
}
