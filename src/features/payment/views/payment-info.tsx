import { auth } from "@/auth";
import { getPayPalSubscription } from "../paypal/action";

export default async function PaymentInfo() {
  const session = await auth();
  const subscriptionId = session?.user.subscriptionId || "";
  console.log("User Subscription ID :", subscriptionId);
  const paypalResponse = await getPayPalSubscription(subscriptionId);
  console.log("PayPal Subscription Response:", paypalResponse);

  return <></>;
}
