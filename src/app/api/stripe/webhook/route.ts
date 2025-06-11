import Stripe from "stripe";
import { NextRequest } from "next/server";
import { stripeService } from "@/features";
import { Role, Status, Payment } from "@/features/user/enums";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;
  const rawBody = await request.text(); // Use text to get raw body
  const signature = request.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (endpointSecret && signature) {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        endpointSecret
      );
    } else {
      event = JSON.parse(rawBody);
    }
  } catch (err: any) {
    console.error("⚠️ Webhook signature verification failed.", err.message);
    return new Response("Webhook Error", { status: 400 });
  }

  const eventType = event.type;

  switch (eventType) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscriptionObject = event.data.object as Stripe.Subscription;
      const subId = subscriptionObject.id;
      const stripeStatus = subscriptionObject.status;
      const pauseCollection = subscriptionObject.pause_collection;
      const customerId = subscriptionObject.customer as string;

      const customer = await stripe.customers.retrieve(customerId);
      const email = (customer as any).email;

      console.log(
        "Event -",
        eventType,
        "| Id -",
        subId,
        "| Status -",
        stripeStatus,
        "| Pause -",
        pauseCollection,
        "| Email -",
        email
      );

      let role: Role;
      let payment: Payment;
      let subscriptionId: string;
      let status: Status;

      switch (stripeStatus) {
        case "active":
          if (!pauseCollection) {
            role = Role.Paid;
            payment = Payment.Stripe;
            subscriptionId = subId;
            status = Status.Active;
          } else {
            role = Role.Private;
            payment = Payment.Stripe;
            subscriptionId = subId;
            status = Status.Suspended;
          }
          break;
        case "canceled":
        case "incomplete":
        default:
          role = Role.Private;
          payment = Payment.Free;
          subscriptionId = "none";
          status = Status.Inactive;
          break;
      }

      const editUserDTO = {
        role,
        payment,
        subscriptionId,
        status,
      };

      await stripeService.editUserByEmail(email, editUserDTO);
      break;
    }
  }

  return new Response(JSON.stringify({ message: "Webhook received." }), {
    status: 200,
  });
}
