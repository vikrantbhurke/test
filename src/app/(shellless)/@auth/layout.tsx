import { dimensions } from "@/global/constants";
import { Anchor, Group, Paper, Stack } from "@mantine/core";
import Link from "next/link";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Stack h="100vh" justify="center" align="center">
      <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
        <Paper p="xl">
          <Stack gap="xl">
            <Group justify="space-evenly" w="100%">
              <Anchor component={Link} href="/sign-in">
                Sign In
              </Anchor>
              <Anchor component={Link} href="/sign-up">
                Sign Up
              </Anchor>
            </Group>
            {children}
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}
