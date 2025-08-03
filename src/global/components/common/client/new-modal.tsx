"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { modalProps } from "@/global/constants";
import { Button, Modal, Stack, Text } from "@mantine/core";
import { useToast } from "@/global/hooks";
import { useNotification } from "@/global/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";

type NewModalProps = {
  action: any;
  route?: string; // Pass route if routeType is push or replace
  routeType?: "push" | "replace" | "back" | "refresh";
  opened: boolean;
  message?: string;
  buttonColor?: string;
  close: () => void;
  loaderType?: "dots" | "bars" | "oval" | "default" | "tailSpin";
  fullWidth?: boolean;
  buttonLabel?: string;
  loaderLabel?: string;
  buttonProps?: any;
};

export function NewModal({
  route,
  routeType,
  close,
  opened,
  action,
  message,
  buttonLabel,
  loaderLabel,
  buttonProps,
}: NewModalProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const [isMutating, setIsMutating] = useState(false);
  const { isMobile } = useSelector((state: RootState) => state.global);

  const handleClick = async () => {
    if (isMutating) return;
    setIsMutating(true);
    const response = await action();
    if (isMobile) showToast(response);
    else showNotification(response);
    if (routeType === "push" && route) router.push(route);
    if (routeType === "replace" && route) router.replace(route);
    if (routeType === "back") router.back();
    if (routeType === "refresh") router.refresh();
    close();
    setIsMutating(false);
  };

  const { loaderProps, ...rest } = buttonProps || {};

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

        {/* Either pass loaderProps or loaderLabel */}

        {loaderProps && (
          <Button
            {...rest}
            aria-label={buttonLabel}
            loading={isMutating}
            disabled={isMutating}
            onClick={handleClick}
            loaderProps={loaderProps}>
            {buttonLabel}
          </Button>
        )}

        {loaderLabel && (
          <Button {...rest} onClick={handleClick} aria-label={buttonLabel}>
            {isMutating ? buttonLabel : loaderLabel}
          </Button>
        )}
      </Stack>
    </Modal>
  );
}
