import { Status } from "@/features/user/enums";
import { Payment } from "@/features/payment/enums";
import * as paymentAction from "@/features";
import { Group, Stack, Text, Title } from "@mantine/core";

type PaymentInfoProps = {
  subscription: any;
  payment: Payment;
};

export async function PaymentInfo({ subscription, payment }: PaymentInfoProps) {
  const list = [
    `⭐ Remove all advertisements.`,
    `⭐ Remove playlist count & size limit.`,
    `⭐ Download styled quotes.`,
  ];

  // Optimistically update the UI until PayPal or Stripe returns the updated subscription details
  const date = new Date();
  const dateIsoString = date.toISOString().split(".")[0] + "Z";
  const nextYearDate = date.setFullYear(date.getFullYear() + 1);
  const nextYearIsoString =
    new Date(nextYearDate).toISOString().split(".")[0] + "Z";

  let status: Status = Status.Inactive;
  let startTime;
  let nextBillingTime;
  let isSuspended = false;
  let isInactive = true;

  if (subscription) {
    if (subscription.status === "ACTIVE") status = Status.Active;
    if (subscription.status === "SUSPENDED") status = Status.Suspended;
    if (subscription.status === "CANCELLED") status = Status.Inactive;
    if (subscription.status === "EXPIRED") status = Status.Inactive;

    isSuspended = status === Status.Suspended;
    isInactive = status === Status.Inactive;

    startTime =
      payment === Payment.PayPal ? dateIsoString : subscription.start_time;

    nextBillingTime =
      payment === Payment.PayPal
        ? nextYearIsoString
        : subscription.billing_info.next_billing_time;
  }

  return (
    <>
      {isInactive && (
        <Stack gap="xs">
          <Title order={5} ta="center">
            Subscribe for just ${10} / year.
          </Title>

          {list.map((item, index) => (
            <Text size="sm" key={index}>
              {item}
            </Text>
          ))}
        </Stack>
      )}

      {!isInactive && (
        <Stack gap={0}>
          <Title order={5} ta="center">
            Subscription Details
          </Title>

          <Group gap="xs">
            <Title order={6} ta="center">
              Status:{" "}
            </Title>

            <Title order={6} c={await paymentAction.getStatusColor(status)}>
              {status}
            </Title>
          </Group>

          <Group gap="xs">
            <Title order={6} ta="center">
              Started On:{" "}
            </Title>

            <Text fz="sm">{await paymentAction.formatDateTime(startTime)}</Text>
          </Group>

          {!isSuspended && (
            <Group gap="xs">
              <Title order={6} ta="center">
                Renews On:{" "}
              </Title>

              <Text fz="sm">
                {await paymentAction.formatDateTime(nextBillingTime)}
              </Text>
            </Group>
          )}
        </Stack>
      )}
    </>
  );
}
