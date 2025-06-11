"use server";
import axios from "axios";

export const getPayPalAccessToken = async () => {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
  ).toString("base64");

  const paypalResponse = await axios.post(
    `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return paypalResponse.data.access_token;
};

export const getHeader = async () => {
  const accessToken = await getPayPalAccessToken();

  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
};

export const createPayPalSubscription = async () => {
  try {
    const session = await axios.post(
      `${process.env.PAYPAL_API_URL}/v1/billing/subscriptions`,
      {
        plan_id: process.env.PAYPAL_PLAN_ID,
        application_context: {
          brand_name: process.env.APP_NAME,
          locale: "en-US",
          user_action: "SUBSCRIBE_NOW",
          payment_method: {
            payer_selected: "PAYPAL",
            payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
          },
          return_url: `${process.env.APP_URL}/subscribe?subscribed=true&subscription=paypal`,
          cancel_url: `${process.env.APP_URL}/subscribe?subscribed=false`,
        },
      },
      await getHeader()
    );

    const approve_url = session.data.links.find(
      (link: any) => link.rel === "approve"
    ).href;

    return { success: true, data: approve_url };
  } catch (error: any) {
    throw error;
  }
};

export const getPayPalSubscription = async (subscriptionId: string) => {
  try {
    if (!subscriptionId) return { message: "User has no active subscription." };

    const subscription = await axios.get(
      `${process.env.PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionId}`,
      await getHeader()
    );

    return {
      success: true,
      data: subscription.data,
    };
  } catch (error: any) {
    throw error;
  }
};

export const suspendPayPalSubscription = async (subscriptionId: string) => {
  try {
    await axios.post(
      `${process.env.PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionId}/suspend`,
      { reason: "User requested suspension." },
      await getHeader()
    );

    return { success: true, message: "Subscription suspended successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const activatePayPalSubscription = async (subscriptionId: string) => {
  try {
    await axios.post(
      `${process.env.PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionId}/activate`,
      { reason: "User requested activation." },
      await getHeader()
    );

    return { success: true, message: "Subscription activated successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const cancelPayPalSubscription = async (subscriptionId: string) => {
  try {
    await axios.post(
      `${process.env.PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionId}/cancel`,
      { reason: "User requested cancellation." },
      await getHeader()
    );

    return { success: true, message: "Subscription canceled successfully." };
  } catch (error: any) {
    throw error;
  }
};
