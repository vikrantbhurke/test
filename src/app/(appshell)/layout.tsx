import { Suspense } from "react";
import { getAuth } from "@/features";
import { Stack } from "@mantine/core";
import classes from "@/global/styles/app.module.css";
import { IconAppsFilled } from "@tabler/icons-react";
import { App, Header, HomeHeader } from "@/global/components/layouts";

type LayoutProps = {
  children: React.ReactNode;
  auth: React.ReactNode;
};

export default async function Layout({ children, auth }: LayoutProps) {
  const nextAuth = await getAuth();

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
      <App auth={nextAuth}>
        <>
          <Header auth={nextAuth}>
            <HomeHeader auth={nextAuth} />
          </Header>

          {children}
          {auth}
        </>
      </App>
    </Suspense>
  );
}
