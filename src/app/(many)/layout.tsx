import { Suspense } from "react";
import { Stack } from "@mantine/core";
import { AppMany } from "@/global/components/layouts";
import { IconAppsFilled } from "@tabler/icons-react";
import classes from "@/global/styles/app.module.css";
import { getAuth } from "@/features/user/action";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const { id, role, name, image } = await getAuth();

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
      <AppMany auth={{ id, role, name, image }}>{children}</AppMany>
    </Suspense>
  );
}
