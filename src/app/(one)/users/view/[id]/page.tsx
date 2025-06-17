import { Paper, Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { UserItem } from "@/features/user/views/server";
import { PaymentInfo } from "@/features/payment/views/server";
import { PayPalButtons } from "@/features/payment/views/client";
import { GetPayPalSubscription } from "@/features/payment/queries";
import { GetSession, GetUserById } from "@/features/user/queries/server";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  return (
    <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawXs}>
      <Paper radius="md" p="xl">
        <Stack gap="xl">
          <GetSession>
            {(session) => (
              <>
                <GetUserById params={params}>
                  {(user) => (
                    <UserItem
                      user={user}
                      sessionUser={{ id: session?.user.id }}
                    />
                  )}
                </GetUserById>

                {session && (
                  <GetPayPalSubscription session={session}>
                    {(subscription) => {
                      const payment = session.user.payment;

                      return (
                        payment && (
                          <>
                            <PaymentInfo
                              subscription={subscription}
                              payment={payment}
                            />

                            <PayPalButtons
                              subscription={subscription}
                              payment={payment}
                            />
                          </>
                        )
                      );
                    }}
                  </GetPayPalSubscription>
                )}
              </>
            )}
          </GetSession>
        </Stack>
      </Paper>
    </Stack>
  );
}
