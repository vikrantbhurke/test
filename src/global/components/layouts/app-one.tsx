"use client";
import Main from "./main";
import Aside from "./aside";
import Navbar from "./navbar";
import Header from "./header";
import Footer from "./footer";
import { useEffect } from "react";
import { AppShell } from "@mantine/core";
import { useViewInfo } from "@/global/hooks";
import { usePathname } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import classes from "@/global/styles/app.module.css";
import { appShellProps } from "@/global/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";

type AppOneProps = {
  children: React.ReactNode;
};

export default function AppOne({ children }: AppOneProps) {
  useViewInfo();
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure();
  const { isMobile } = useSelector((state: RootState) => state.global);
  useEffect(() => close(), [pathname, close]);

  return (
    <AppShell
      withBorder={false}
      aside={appShellProps.aside}
      footer={appShellProps.footer}
      header={appShellProps.header}
      navbar={appShellProps.navbar(opened)}
      h="100vh">
      <AppShell.Header className={`${!isMobile && classes.blurBg}`}>
        <Header opened={opened} toggle={toggle} pathname={pathname} />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar pathname={pathname} />
      </AppShell.Navbar>

      <AppShell.Aside>
        <Aside />
      </AppShell.Aside>

      <AppShell.Main h="100%">
        <Main>{children}</Main>
      </AppShell.Main>

      <AppShell.Footer>
        <Footer pathname={pathname} />
      </AppShell.Footer>
    </AppShell>
  );
}
