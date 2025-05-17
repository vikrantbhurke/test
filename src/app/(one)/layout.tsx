import { AppOne } from "@/global/components/layouts";
import { Stack } from "@mantine/core";
import { IconAppsFilled } from "@tabler/icons-react";
import { Suspense } from "react";
import classes from "@/global/styles/app.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
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
      <AppOne>{children}</AppOne>
    </Suspense>
  );
}
