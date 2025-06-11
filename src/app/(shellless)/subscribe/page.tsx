import { auth } from "@/auth";
import { dimensions } from "@/global/constants";
import { Paper, Stack, Text } from "@mantine/core";
import { PaymentInfo } from "@/features/payment/views";
import { PayPalButtons } from "@/features/payment/paypal/views";
import { getPayPalSubscription } from "@/features/payment/paypal/action";

export default async function Page() {
  const session = await auth();
  const subscriptionId = session?.user.subscriptionId || "";

  if (!subscriptionId) {
    return (
      <Stack h="100vh" justify="center" align="center">
        <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
          <Paper p="xl">
            <Text>Please log in to manage your subscription.</Text>
          </Paper>
        </Stack>
      </Stack>
    );
  }

  const response = await getPayPalSubscription(subscriptionId);
  console.log("Subscription Response:", response?.data);

  return (
    <Stack h="100vh" justify="center" align="center">
      <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
        <Paper p="xl">
          <PaymentInfo />
          <PayPalButtons subscriptionId={subscriptionId} />
        </Paper>
      </Stack>
    </Stack>
  );
}
