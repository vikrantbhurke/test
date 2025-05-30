"use client";
import { Provider } from "react-redux";
import ToastProvider from "./toast-provider";
import { store } from "@/global/states/store";
import { theme } from "@/global/styles/theme";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { Notifications } from "@mantine/notifications";
import { NavigationProgress } from "@mantine/nprogress";
import { resolveCssVariables } from "@/global/styles/css.variables";
import NProgress from "./navigation-progress";

export default function Providers({ children }: any) {
  return (
    <Provider store={store}>
      <MantineProvider
        theme={theme}
        defaultColorScheme="auto"
        cssVariablesResolver={resolveCssVariables}>
        <ToastProvider>
          <SessionProvider>
            <Notifications />
            <NavigationProgress />
            <NProgress />
            {children}
          </SessionProvider>
        </ToastProvider>
      </MantineProvider>
    </Provider>
  );
}
