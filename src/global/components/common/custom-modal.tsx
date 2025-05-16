"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { modalProps } from "@/global/constants";
import { Button, Modal, Stack, Text } from "@mantine/core";
import { Action } from "@/global/classes";
import { useToast } from "@/global/hooks/use-toast";
import { useNotification } from "@/global/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";

type CustomModalProps = {
  action: any;
  route?: string;
  opened: boolean;
  message?: string;
  buttonColor?: string;
  close: () => void;
  loaderType?: "dots" | "bars" | "oval" | "default" | "tailSpin";
  fullWidth?: boolean;
  buttonLabel?: string;
  loaderLabel?: string;
};

export default function CustomModal({
  route,
  close,
  opened,
  action,
  message,
  buttonColor,
  buttonLabel,
  fullWidth = true,
  loaderType,
  loaderLabel,
}: CustomModalProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const [isMutating, setIsMutating] = useState(false);
  const { isMobile } = useSelector((state: RootState) => state.global);

  const handleClick = async () => {
    try {
      if (isMutating) return;
      setIsMutating(true);
      const response = await action();

      if (Action.isSuccess(response)) {
        const alert = { message: response.message, status: "success" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
        route && router.push(route);
      } else {
        const alert = { message: response.error, status: "error" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
      }
      close();
    } catch (error: any) {
      const alert = { message: error.message, status: "error" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <Modal
      centered
      opened={opened}
      onClose={close}
      overlayProps={modalProps.overlayProps}>
      <Stack gap="lg">
        <Text fz="sm" ta="center">
          {message}
        </Text>

        {/* Either pass loaderType or loaderLabel */}

        {loaderType && (
          <Button
            color={buttonColor}
            loading={isMutating}
            disabled={isMutating}
            onClick={handleClick}
            fullWidth={fullWidth}
            loaderProps={{ type: loaderType }}>
            {buttonLabel}
          </Button>
        )}

        {loaderLabel && (
          <Button
            fullWidth={fullWidth}
            color={buttonColor}
            onClick={handleClick}>
            {isMutating ? buttonLabel : loaderLabel}
          </Button>
        )}
      </Stack>
    </Modal>
  );
}
