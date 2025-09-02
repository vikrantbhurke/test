"use client";
import { NProgress } from "./nprogress";
import { Provider } from "react-redux";
import { store } from "@/global/states/store";
import { theme } from "@/global/styles/theme";
import { MantineProvider } from "@mantine/core";
import { ToastProvider } from "./toast-provider";
import { Notifications } from "@mantine/notifications";
import { resolveCssVariables } from "@/global/styles/css.variables";
import { RegisterServiceWorker } from "@/global/components/common/client";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <MantineProvider
        theme={theme}
        defaultColorScheme="auto"
        cssVariablesResolver={resolveCssVariables}>
        <ToastProvider>
          <Notifications />
          <NProgress aria-label="Loading Indicator" />
          <RegisterServiceWorker />
          {children}
        </ToastProvider>
      </MantineProvider>
    </Provider>
  );
}
