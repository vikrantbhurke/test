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
import { appShellProps } from "@/global/constants";
import classes from "@/global/styles/app.module.css";

type AppProps = {
  auth: any;
  children: React.ReactNode;
};

export function App({ children, auth }: AppProps) {
  useViewInfo();
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure();
  useEffect(() => close(), [pathname, close]);

  return (
    <AppShell
      withBorder
      aside={appShellProps.aside}
      footer={appShellProps.footer}
      header={appShellProps.header}
      navbar={appShellProps.navbar(opened)}
      layout="alt">
      <AppShell.Header className={`${classes.blurBg}`}>
        <Header opened={opened} toggle={toggle} auth={auth} />
      </AppShell.Header>

      <AppShell.Navbar visibleFrom="sm">
        <Navbar pathname={pathname} auth={{ id: auth.id, role: auth.role }} />
      </AppShell.Navbar>

      <AppShell.Navbar maw={300} hiddenFrom="sm">
        <Navbar pathname={pathname} auth={{ id: auth.id, role: auth.role }} />
      </AppShell.Navbar>

      <AppShell.Aside>
        <Aside />
      </AppShell.Aside>

      <AppShell.Main>
        <Main>{children}</Main>
      </AppShell.Main>

      <AppShell.Footer>
        <Footer pathname={pathname} auth={{ role: auth.role }} />
      </AppShell.Footer>
    </AppShell>
  );
}
