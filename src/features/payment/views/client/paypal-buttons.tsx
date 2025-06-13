"use client";
import {
  createPayPalSubscription,
  activatePayPalSubscription,
} from "@/features/payment/action";
import { useDisclosure } from "@mantine/hooks";
import { Button, Stack } from "@mantine/core";
import { Status } from "@/features/user/enums";
import { Payment } from "@/features/payment/enums";
import { useRouter } from "next/navigation";
import { useToast } from "@/global/hooks";
import { useNotification } from "@/global/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { Action } from "@/global/classes";
import { useEffect } from "react";
import { homeRoute } from "@/global/constants/routes";
import PayPalSuspendModal from "./paypal-suspend-modal";
import PayPalCancelModal from "./paypal-cancel-modal";

type PayPalButtonsProps = {
  subscription: any;
  payment: Payment;
};

export default function PayPalButtons({
  subscription,
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
          const alert = {
            message: `Congrats! You have successfully subscribed to ${process.env.NEXT_PUBLIC_APP_NAME}. It may take few seconds to activate your subscription.`,
            status: "success" as const,
            autoClose: 10000,
          };

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
      const alert = {
        message: error.message,
        status: "error" as const,
        autoClose: 10000,
      };

      if (isMobile) showToast(alert);
      else showNotification(alert);
    }
  };

  const handleActivate = async () => {
    try {
      const response = await activatePayPalSubscription(subscription.id);

      if (Action.isSuccess(response)) {
        const alert = {
          message: response.message,
          status: "success" as const,
          autoClose: 10000,
        };

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

  if (subscription) {
    const { status: paypalStatus } = subscription;
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
      {isPayPal && isActive && (
        <>
          <PayPalSuspendModal
            opened={suspendOpened}
            close={suspendClose}
            id={subscription.id}
          />

          <PayPalCancelModal
            opened={cancelOpened}
            close={cancelClose}
            id={subscription.id}
          />
        </>
      )}

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
