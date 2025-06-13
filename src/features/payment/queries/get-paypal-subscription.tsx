import { getPayPalSubscription } from "../action";
import { Session } from "next-auth";

type GetPayPalSubscriptionProps = {
  session: Session;
  children: (args: any) => React.ReactNode;
};

export default async function GetPayPalSubscription({
  session,
  children,
}: GetPayPalSubscriptionProps) {
  const subId = session.user.subscriptionId || null;
  const response = await getPayPalSubscription(subId);
  return children(response.data);
}
