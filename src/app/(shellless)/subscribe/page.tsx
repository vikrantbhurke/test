import { auth } from "@/auth";
import { dimensions } from "@/global/constants";
import { Paper, Stack, Text } from "@mantine/core";
import { PaymentInfo } from "@/features/payment/views";
import { PayPalButtons } from "@/features/payment/paypal/views";
import { getPayPalSubscription } from "@/features/payment/paypal/action";

export default async function Page() {
  const session = await auth();
  const subscriptionId = session?.user.subscriptionId || "";

  if (!subscriptionId || !session?.user) {
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

  const paypalResponse = await getPayPalSubscription(subscriptionId);

  return (
    <Stack h="100vh" justify="center" align="center">
      <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
        <Paper p="xl">
          <Stack gap="md">
            <PaymentInfo />
            <PayPalButtons
              subscriptionId={subscriptionId}
              paypalStatus={paypalResponse?.data?.status}
              payment={session?.user?.payment}
            />
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}
