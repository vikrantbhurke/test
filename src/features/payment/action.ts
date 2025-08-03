"use server";
import axios from "axios";
import { Status } from "../user/enums";

export async function getPayPalAccessToken() {
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
}

export async function getHeader() {
  const accessToken = await getPayPalAccessToken();

  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
}

export async function createPayPalSubscription() {
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

    return approve_url;
  } catch (error: any) {
    throw error;
  }
}

export async function getPayPalSubscription(subscriptionId: string | null) {
  try {
    if (!subscriptionId) return null;

    const subscription = await axios.get(
      `${process.env.PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionId}`,
      await getHeader()
    );

    return subscription.data;
  } catch (error: any) {
    throw error;
  }
}

export async function suspendPayPalSubscription(subscriptionId: string) {
  try {
    await axios.post(
      `${process.env.PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionId}/suspend`,
      { reason: "User requested suspension." },
      await getHeader()
    );

    return {
      status: "success",
      message:
        "Subscription suspended successfully. It may take few seconds to suspend your subscription.",
    };
  } catch (error: any) {
    throw error;
  }
}

export async function activatePayPalSubscription(
  subscriptionId: string | null
) {
  try {
    await axios.post(
      `${process.env.PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionId}/activate`,
      { reason: "User requested activation." },
      await getHeader()
    );

    return {
      status: "success",
      message:
        "Subscription activated successfully. It may take few seconds to activate your subscription.",
    };
  } catch (error: any) {
    throw error;
  }
}

export async function cancelPayPalSubscription(subscriptionId: string) {
  try {
    await axios.post(
      `${process.env.PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionId}/cancel`,
      { reason: "User requested cancellation." },
      await getHeader()
    );

    return {
      status: "success",
      message:
        "Subscription canceled successfully. It may take few seconds to cancel your subscription.",
    };
  } catch (error: any) {
    throw error;
  }
}

export async function getStatusColor(status: Status) {
  switch (status) {
    case Status.Active:
      return "green";
    case Status.Inactive:
      return "red";
    case Status.Suspended:
      return "yellow";
    default:
      return "gray";
  }
}

export async function formatDateTime(isoString: any) {
  const date = new Date(isoString);

  // Extract date components
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getUTCFullYear();

  // Extract time components
  // let hours = date.getUTCHours();
  // const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  // const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  // hours = hours % 12 || 12;

  return `${day}/${month}/${year}`;
}

export async function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
