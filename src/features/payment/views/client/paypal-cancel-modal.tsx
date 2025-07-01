"use client";
import { useSelector } from "react-redux";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { useToast } from "@/global/hooks";
import { Button, Modal, Stack, Text } from "@mantine/core";
import { cancelPayPalSubscription } from "@/features";

export function PayPalCancelModal({ opened, close, id }: any) {
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const { isMobile } = useSelector((state: RootState) => state.global);

  const handleCancel = async () => {
    try {
      const message = await cancelPayPalSubscription(id);

      const alert = {
        message,
        status: "success" as const,
        autoClose: 10000,
      };

      if (isMobile) showToast(alert);
      else showNotification(alert);
      close();
    } catch (error: any) {
      const alert = { message: error.message, status: "error" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
    }
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <Stack gap="lg">
        <Text fz="sm" ta="center">
          Are you sure you want to cancel your subscription? You will lose
          access to paid features immediately. You will have to subscribe again
          to regain access.
        </Text>

        <Button
          bg="red"
          onClick={handleCancel}
          loaderProps={{ type: "dots", color: "white" }}>
          Cancel Subscription
        </Button>
      </Stack>
    </Modal>
  );
}
