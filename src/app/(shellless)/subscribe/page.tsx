import { auth } from "@/auth";
import { dimensions } from "@/global/constants";
import { Paper, Stack, Text } from "@mantine/core";
import { PayPalButtons } from "@/features/payment/paypal/views";
import { PaymentInfo } from "@/features/payment/views";

export default async function Page() {
  const session = await auth();
  const userId = session?.user.id || "";
  const subscriptionId = session?.user.subscriptionId || "";

  if (!userId || !subscriptionId) {
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

  return (
    <Stack h="100vh" justify="center" align="center">
      <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
        <Paper p="xl">
          <PaymentInfo />
          <PayPalButtons userId={userId} subscriptionId={subscriptionId} />
        </Paper>
      </Stack>
    </Stack>
  );
}
