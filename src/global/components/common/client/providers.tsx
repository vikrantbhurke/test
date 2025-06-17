"use client";
import NProgress from "./nprogress";
// import SessionProvider from "./session-provider";
import { Provider } from "react-redux";
import ToastProvider from "./toast-provider";
import { store } from "@/global/states/store";
import { theme } from "@/global/styles/theme";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { resolveCssVariables } from "@/global/styles/css.variables";
import { RegisterServiceWorker } from "@/global/components/common/client";
// import { Session } from "next-auth";

type ProvidersProps = {
  children: React.ReactNode;
  // session?: Session | null;
};

export default function Providers({
  children,
}: // session
ProvidersProps) {
  return (
    <Provider store={store}>
      <MantineProvider
        theme={theme}
        defaultColorScheme="auto"
        cssVariablesResolver={resolveCssVariables}>
        <ToastProvider>
          {/* <SessionProvider session={session}> */}
          <Notifications />
          <NProgress aria-label="Loading Indicator" />
          <RegisterServiceWorker />
          {children}
          {/* </SessionProvider> */}
        </ToastProvider>
      </MantineProvider>
    </Provider>
  );
}
