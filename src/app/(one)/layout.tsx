import { AppOne } from "@/global/components/layouts";
import { Stack } from "@mantine/core";
import { IconAppsFilled } from "@tabler/icons-react";
import { Suspense } from "react";
import classes from "@/global/styles/app.module.css";
import { auth } from "@/auth";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const session = await auth();

  return (
    <Suspense
      fallback={
        <Stack h="100vh" justify="center" align="center">
          <IconAppsFilled
            size={60}
            color="var(--tx-one)"
            className={classes.smoothPulse}
          />
        </Stack>
      }>
      <AppOne session={session}>{children}</AppOne>
    </Suspense>
  );
}
