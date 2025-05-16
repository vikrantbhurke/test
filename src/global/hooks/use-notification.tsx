import { notifications } from "@mantine/notifications";
import { useSelector } from "react-redux";
import { RootState } from "../states/store";
import classes from "@/global/styles/app.module.css";

type ShowNotificationArgs = {
  title?: string;
  message?: string;
  autoClose?: number;
  withCloseButton?: boolean;
  status: "success" | "warning" | "error" | "info";
};

export const useNotification = () => {
  const { isMobile } = useSelector((state: RootState) => state.global);

  const showNotification = ({
    title,
    message,
    status,
    autoClose = 5000,
    withCloseButton = false,
  }: ShowNotificationArgs) => {
    let color;
    if (status == "success") color = "emerald";
    if (status == "warning") color = "yellow";
    if (status == "error") color = "rose";
    if (status == "info") color = "blue";

    notifications.show({
      color,
      title,
      message,
      autoClose,
      withCloseButton,
      classNames: {
        root: classes.shadow,
      },
      position: isMobile ? "bottom-center" : "bottom-right",
    });
  };

  return { showNotification };
};
