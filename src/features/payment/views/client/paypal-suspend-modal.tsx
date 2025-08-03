"use client";
import { useToast } from "@/global/hooks";
import { useSelector } from "react-redux";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { suspendPayPalSubscription } from "@/features";
import { Button, Modal, Stack, Text } from "@mantine/core";

export function PayPalSuspendModal({ opened, close, id }: any) {
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const { isMobile } = useSelector((state: RootState) => state.global);

  const handleSuspend = async () => {
    const response = await suspendPayPalSubscription(id);

    const alert = {
      ...response,
      autoClose: 10000,
    };

    if (isMobile) showToast(alert);
    else showNotification(alert);
    close();
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
          aria-label="Suspend Subscription"
          loaderProps={{ type: "dots", color: "white" }}>
          Suspend Subscription
        </Button>
      </Stack>
    </Modal>
  );
}
