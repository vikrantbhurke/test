"use client";
import { Main } from "./main";
import { Footer } from "./footer";
import { useViewInfo } from "@/global/hooks";
import { usePathname } from "next/navigation";
import { Space, Stack } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

type AppProps = {
  auth: any;
  children: React.ReactNode;
};

export function App({ children, auth }: AppProps) {
  useViewInfo();
  const { width } = useViewportSize();
  const pathname = usePathname();

  const border = "1px solid var(--tx-one)";

  const borderStyles =
    width <= 576
      ? {}
      : {
          borderLeft: border,
          borderRight: border,
        };

  return (
    <Stack gap={0} align="center">
      <Stack
        gap={0}
        w="100%"
        maw={576}
        mih="100vh"
        align="center"
        style={borderStyles}>
        <Space h={60} w="100%" maw={576} />

        <Main>{children}</Main>

        <Space h={60} w="100%" maw={576} hiddenFrom="sm" />

        <Stack
          h={60}
          w="100%"
          maw={576}
          align="center"
          justify="center"
          bg="var(--bg-one)"
          hiddenFrom="sm"
          style={{
            bottom: 0,
            zIndex: 100,
            position: "fixed",
            ...borderStyles,
            borderTop: border,
          }}>
          <Footer pathname={pathname} auth={auth} />
        </Stack>
      </Stack>
    </Stack>
  );
}
