"use client";
import { createContext, useCallback, useState, ReactNode } from "react";
import { Stack, Text, Title, Transition } from "@mantine/core";
import { dimensions } from "@/global/constants";

type ToastProps = {
  title?: string;
  message?: string;
  status: "success" | "warning" | "error" | "info";
  autoClose?: number;
  position?: "top" | "bottom";
};

type ToastContextType = {
  showToast: (props: ToastProps) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

type ToastProviderProps = {
  children: ReactNode;
};

export default function ToastProvider({ children }: ToastProviderProps) {
  const [opened, setOpened] = useState(false);
  const [toast, setToast] = useState<ToastProps>({
    title: "",
    message: "",
    status: "info",
    autoClose: 5000,
    position: "bottom",
  });

  //   const close = useCallback(() => setOpened(false), []);

  const showToast = useCallback((props: ToastProps) => {
    setToast({ ...props });
    setOpened(true);

    const timeout = setTimeout(() => {
      setOpened(false);
    }, props.autoClose || 5000);

    return () => clearTimeout(timeout);
  }, []);

  let bg = "blue";
  if (toast.status === "success") bg = "emerald";
  if (toast.status === "warning") bg = "yellow";
  if (toast.status === "error") bg = "rose";
  if (toast.status === "info") bg = "blue";

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Transition
        duration={300}
        mounted={opened}
        transition="slide-up"
        timingFunction="ease">
        {(styles) => (
          <Stack
            p="xs"
            h={dimensions.footerHeight}
            w="100vw"
            gap={0}
            pos="fixed"
            bg={bg}
            justify="center"
            align="center"
            style={{
              ...styles,
              zIndex: 1000,
              [toast.position || "bottom"]: 0,
              left: "50%",
              transform: "translateX(-50%)",
            }}>
            {toast.title && <Title order={6}>{toast.title}</Title>}
            {toast.message && <Text>{toast.message}</Text>}
          </Stack>
        )}
      </Transition>
    </ToastContext.Provider>
  );
}
