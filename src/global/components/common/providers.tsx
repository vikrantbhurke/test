"use client";
import { Provider } from "react-redux";
import ToastProvider from "./toast-provider";
import { store } from "@/global/states/store";
import { theme } from "@/global/styles/theme";
import NProgress from "./navigation-progress";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { Notifications } from "@mantine/notifications";
import { resolveCssVariables } from "@/global/styles/css.variables";

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
            <NProgress />
            {children}
          </SessionProvider>
        </ToastProvider>
      </MantineProvider>
    </Provider>
  );
}
