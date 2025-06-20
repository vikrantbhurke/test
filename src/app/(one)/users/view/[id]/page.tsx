import { notFound } from "next/navigation";
import { Paper, Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { UserItem } from "@/features/user/views/server";
import { getAuth, getUserById } from "@/features/user/action";
import { PaymentInfo } from "@/features/payment/views/server";
import { PayPalButtons } from "@/features/payment/views/client";
import { getPayPalSubscription } from "@/features/payment/action";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id: uid, subId, payment } = await getAuth();
  const { id } = await params;

  const user = await getUserById(id);
  if (!user) return notFound();

  let subscription = null;
  if (subId) subscription = await getPayPalSubscription(subId);

  return (
    <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
      <Paper radius="md" p="xl">
        <Stack gap="xl">
          <UserItem user={user} auth={{ id: uid }} />
          <PaymentInfo subscription={subscription} payment={payment} />
          <PayPalButtons subscription={subscription} payment={payment} />
        </Stack>
      </Paper>
    </Stack>
  );
}
