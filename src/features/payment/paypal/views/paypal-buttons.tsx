"use client";
import {
  cancelPayPalSubscription,
  createPayPalSubscription,
  suspendPayPalSubscription,
  activatePayPalSubscription,
} from "../action";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal, Stack, Text } from "@mantine/core";
import { Payment, Status } from "@/features/user/enums";
import { useRouter } from "next/navigation";
import { useToast } from "@/global/hooks/use-toast";
import { useNotification } from "@/global/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { Action } from "@/global/classes";
import { useEffect } from "react";
import { homeRoute } from "@/global/constants/routes";

type PayPalButtonsProps = {
  subscriptionId: string;
  paypalStatus?: string;
  payment?: Payment;
};

export default function PayPalButtons({
  subscriptionId,
  paypalStatus,
  payment,
}: PayPalButtonsProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const { isMobile } = useSelector((state: RootState) => state.global);

  const [suspendOpened, { open: suspendOpen, close: suspendClose }] =
    useDisclosure();

  const [cancelOpened, { open: cancelOpen, close: cancelClose }] =
    useDisclosure();

  useEffect(() => {
    const handleSuccess = async () => {
      const query = new URLSearchParams(window.location.search);
      const isSubscribed = query.get("subscribed") === "true";
      const isPayPal = query.get("subscription") === "paypal";

      if (isSubscribed && isPayPal) {
        router.push(homeRoute);

        setTimeout(() => {
          const message = `Congrats! You have successfully subscribed to ${process.env.APP_NAME}.`;
          const alert = { message, status: "success" as const };
          if (isMobile) showToast(alert);
          else showNotification(alert);
        }, 2000);
      }
    };

    handleSuccess();
  }, [isMobile, router, showToast, showNotification]);

  const handleCreate = async () => {
    try {
      const response = await createPayPalSubscription();
      if (response.success) window.open(response.data, "_self");
    } catch (error: any) {
      const alert = { message: error.message, status: "error" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
    }
  };

  const handleActivate = async () => {
    try {
      const response = await activatePayPalSubscription(subscriptionId);

      if (Action.isSuccess(response)) {
        const alert = { message: response.message, status: "success" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
      }
    } catch (error: any) {
      const alert = { message: error.message, status: "error" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
    }
  };

  let status: Status = Status.Inactive;

  if (subscriptionId) {
    if (paypalStatus === "ACTIVE") status = Status.Active;
    if (paypalStatus === "SUSPENDED") status = Status.Suspended;
    if (paypalStatus === "CANCELLED") status = Status.Inactive;
    if (paypalStatus === "EXPIRED") status = Status.Inactive;
  }

  const query = new URLSearchParams(window.location.search);
  const isActive = status === Status.Active;
  const isInactive = status === Status.Inactive;
  const isSuspended = status === Status.Suspended;
  const isFree = payment === Payment.Free;

  const isPayPal =
    payment === Payment.PayPal || query.get("subscription") === "paypal";

  return (
    <Stack>
      <SuspendModal
        opened={suspendOpened}
        close={suspendClose}
        subscriptionId={subscriptionId}
      />

      <CancelModal
        opened={cancelOpened}
        close={cancelClose}
        subscriptionId={subscriptionId}
      />

      {isFree && isInactive && (
        <Button
          c="black"
          bg="#F2BA36"
          onClick={handleCreate}
          loaderProps={{ type: "dots", color: "black" }}>
          Subscribe With PayPal
        </Button>
      )}

      {isPayPal && isActive && (
        <Button
          onClick={suspendOpen}
          bg="#F2BA36"
          c="black"
          loaderProps={{ type: "dots", color: "black" }}>
          Suspend Subscription
        </Button>
      )}

      {isPayPal && isSuspended && (
        <Button
          bg="green"
          onClick={handleActivate}
          loaderProps={{ type: "dots", color: "white" }}>
          Activate Subscription
        </Button>
      )}

      {isPayPal && (isActive || isSuspended) && (
        <Button
          bg="red"
          onClick={cancelOpen}
          loaderProps={{ type: "dots", color: "white" }}>
          Cancel Subscription
        </Button>
      )}
    </Stack>
  );
}

export const CancelModal = ({ opened, close, subscriptionId }: any) => {
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const { isMobile } = useSelector((state: RootState) => state.global);

  const handleCancel = async () => {
    try {
      const response = await cancelPayPalSubscription(subscriptionId);

      if (Action.isSuccess(response)) {
        const alert = { message: response.message, status: "success" as const };
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
};

export const SuspendModal = ({ opened, close, subscriptionId }: any) => {
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const { isMobile } = useSelector((state: RootState) => state.global);

  const handleSuspend = async () => {
    try {
      const response = await suspendPayPalSubscription(subscriptionId);

      if (Action.isSuccess(response)) {
        const alert = { message: response.message, status: "success" as const };
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
};
