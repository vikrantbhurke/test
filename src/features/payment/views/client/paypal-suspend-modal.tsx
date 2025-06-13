"use client";
import { Action } from "@/global/classes";
import { useSelector } from "react-redux";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { useToast } from "@/global/hooks";
import { Button, Modal, Stack, Text } from "@mantine/core";
import { suspendPayPalSubscription } from "@/features/payment/action";

export default function PayPalSuspendModal({ opened, close, id }: any) {
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const { isMobile } = useSelector((state: RootState) => state.global);

  const handleSuspend = async () => {
    try {
      const response = await suspendPayPalSubscription(id);

      if (Action.isSuccess(response)) {
        const alert = {
          message: response.message,
          status: "success" as const,
          autoClose: 10000,
        };

        if (isMobile) showToast(alert);
        else showNotification(alert);
        close();
      }
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
          Are you sure you want to suspend your subscription? You cannot access
          paid features and you will not be charged while suspended. You can
          always reactivate your subscription.
        </Text>

        <Button
          c="black"
          bg="#F2BA36"
          onClick={handleSuspend}
          loaderProps={{ type: "dots", color: "white" }}>
          Suspend Subscription
        </Button>
      </Stack>
    </Modal>
  );
}
