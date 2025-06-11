import { auth } from "@/auth";
import { getPayPalSubscription } from "../paypal/action";
import { Payment, Status } from "@/features/user/enums";
import { Group, Stack, Text, Title } from "@mantine/core";
import { paymentUtility } from "@/features";

export default async function PaymentInfo() {
  const session = await auth();
  const payment = session?.user?.payment || "";
  const subscriptionId = session?.user.subscriptionId || "";
  const paypalResponse = await getPayPalSubscription(subscriptionId);

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

  const isPayPal = payment === Payment.PayPal;

  let status: Status = Status.Inactive;
  let startTime;
  let nextBillingTime;
  let isSuspended = false;
  let isInactive = true;

  if (paypalResponse.success) {
    const { status: paypalStatus, start_time } = paypalResponse.data;

    if (paypalStatus === "ACTIVE") status = Status.Active;
    if (paypalStatus === "SUSPENDED") status = Status.Suspended;
    if (paypalStatus === "CANCELLED") status = Status.Inactive;
    if (paypalStatus === "EXPIRED") status = Status.Inactive;

    isSuspended = status === Status.Suspended;
    isInactive = status === Status.Inactive;
    startTime = isPayPal ? dateIsoString : start_time;
    nextBillingTime = isPayPal
      ? nextYearIsoString
      : paypalResponse.data.billing_info.next_billing_time;
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

            <Title order={6} c={paymentUtility.getStatusColor(status)}>
              {status}
            </Title>
          </Group>

          <Group gap="xs">
            <Title order={6} ta="center">
              Started On:{" "}
            </Title>

            <Text fz="sm">{paymentUtility.formatDateTime(startTime)}</Text>
          </Group>

          {!isSuspended && (
            <Group gap="xs">
              <Title order={6} ta="center">
                Renews On:{" "}
              </Title>

              <Text fz="sm">
                {paymentUtility.formatDateTime(nextBillingTime)}
              </Text>
            </Group>
          )}
        </Stack>
      )}
    </>
  );
}
