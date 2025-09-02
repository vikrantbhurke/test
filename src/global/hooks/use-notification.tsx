"use client";
import { notifications as notifs } from "@mantine/notifications";
import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import classes from "@/global/styles/app.module.css";
import { ReactNode } from "react";
import { Text, Title } from "@mantine/core";
import { Screen } from "../enums";

type ShowNotificationArgs = {
  icon?: ReactNode;
  title?: string;
  message?: string;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "bottom-center"
    | "top-center";
  autoClose?: number;
  withCloseButton?: boolean;
  status: string; // "success" | "warning" | "error" | "info" | "default";
};

export const useNotification = () => {
  const { screen } = useSelector((state: RootState) => state.global);

  const showNotification = ({
    icon,
    title,
    status,
    message,
    position,
    autoClose = 5000,
    withCloseButton = false,
  }: ShowNotificationArgs) => {
    let color;
    if (status == "success") color = "emerald";
    if (status == "warning") color = "yellow";
    if (status == "error") color = "rose";
    if (status == "info") color = "blue";
    if (status === "default") color = "transparent";

    notifs.show({
      icon,
      color,
      title: <Title order={6}>{title}</Title>,
      message: <Text c="var(--tx-five)">{message}</Text>,
      autoClose,
      withCloseButton,
      classNames: {
        root: classes.shadow,
      },
      position: position
        ? position
        : screen === Screen.Mobile || screen === Screen.Tablet
        ? "bottom-center"
        : "bottom-right",
    });
  };

  return { showNotification };
};
