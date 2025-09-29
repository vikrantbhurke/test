"use client";
import { Aside } from "./aside";
import { Navbar } from "./navbar";
import { Stack } from "@mantine/core";
import { AppName } from "../common/client";
import { useViewInfo } from "@/global/hooks";
import { usePathname } from "next/navigation";

type AppProps = {
  auth: any;
  children: React.ReactNode;
};

export function Header({ auth, children }: AppProps) {
  useViewInfo();
  const pathname = usePathname();
  const border = "1px solid var(--tx-one)";

  return (
    <Stack
      h={60}
      w="100%"
      maw={574}
      align="center"
      bg="var(--bg-one)"
      justify="center"
      style={{
        top: 0,
        zIndex: 100,
        position: "fixed",
        borderBottom: border,
      }}>
      {children}

      <Stack
        w={220}
        h="100vh"
        align="right"
        visibleFrom="xl"
        style={{
          top: 0,
          left: -220,
          position: "absolute",
        }}>
        <Stack visibleFrom="xl" p="sm" align="flex-start">
          <AppName />
        </Stack>

        <Navbar pathname={pathname} auth={auth} />
      </Stack>

      <Stack
        w={400}
        h="100vh"
        align="center"
        justify="center"
        visibleFrom="xl"
        style={{
          top: 0,
          right: -400,
          position: "absolute",
        }}>
        <Aside />
      </Stack>
    </Stack>
  );
}
