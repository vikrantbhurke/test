// "use server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// export const createStripeSubscription = async () => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       mode: "subscription",
//       payment_method_types: ["card"],
//       billing_address_collection: "auto",
//       line_items: [
//         {
//           price: process.env.STRIPE_PRICE_ID as string,
//           quantity: 1,
//         },
//       ],
//       success_url: `${process.env.CLIENT_URL}/subscribe?subscribed=true&subscription=stripe&session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.CLIENT_URL}/subscribe?subscribed=false`,
//     });

//     return { approve_url: session.url };
//   } catch (error: any) {
//     return { message: error.message };
//   }
// };

// export const getStripeSubscriptionId = async (sessionId: string) => {
//   try {
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     return { subscriptionId: session.subscription };
//   } catch (error: any) {
//     return { message: error.message };
//   }
// };

// export const getStripeSubscription = async (subscriptionId: string) => {
//   try {
//     if (!subscriptionId) return { message: "User has no active subscription." };
//     const subscription = await stripe.subscriptions.retrieve(subscriptionId);

//     return {
//       success: true,
//       data: subscription,
//       message: "Subscription retrieved successfully.",
//     };
//   } catch (error: any) {
//     return { message: error.message };
//   }
// };

// export const suspendStripeSubscription = async (subscriptionId: string) => {
//   try {
//     await stripe.subscriptions.update(subscriptionId, {
//       pause_collection: { behavior: "mark_uncollectible" },
//     });

//     return { message: "Subscription suspended successfully." };
//   } catch (error: any) {
//     return { message: error.message };
//   }
// };

// export const activateStripeSubscription = async (subscriptionId: string) => {
//   try {
//     await stripe.subscriptions.update(subscriptionId, {
//       pause_collection: null,
//     });

//     return { message: "Subscription activated successfully." };
//   } catch (error: any) {
//     return { message: error.message };
//   }
// };

// export const cancelStripeSubscription = async (subscriptionId: string) => {
//   try {
//     await stripe.subscriptions.cancel(subscriptionId);

//     return { message: "Subscription canceled successfully." };
//   } catch (error: any) {
//     return { message: error.message };
//   }
// };
