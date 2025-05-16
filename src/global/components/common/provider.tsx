"use client";
import { Provider } from "react-redux";
import { store } from "@/global/states/store";
import { theme } from "@/global/styles/theme";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { resolveCssVariables } from "@/global/styles/css.variables";
import ToastProvider from "./toast-provider";

export default function Providers({ children }: any) {
  return (
    <Provider store={store}>
      <MantineProvider
        theme={theme}
        defaultColorScheme="auto"
        cssVariablesResolver={resolveCssVariables}>
        <ToastProvider>
          <Notifications />
          {children}
        </ToastProvider>
      </MantineProvider>
    </Provider>
  );
}
