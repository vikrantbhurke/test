"use client";
import { useSelector } from "react-redux";
import { useToast } from "@/global/hooks";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { cancelPayPalSubscription } from "@/features";
import { Button, Modal, Stack, Text } from "@mantine/core";

export function PayPalCancelModal({ opened, close, id }: any) {
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const { isMobile } = useSelector((state: RootState) => state.global);

  const handleCancel = async () => {
    const response = await cancelPayPalSubscription(id);

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
