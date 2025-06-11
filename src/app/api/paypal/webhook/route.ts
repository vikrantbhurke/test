import { editUserByEmail } from "@/features/user/action";
import { Role, Status, Payment } from "@/features/user/enums";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const event = JSON.parse(rawBody);
    const eventType = event.event_type;
    const subId = event.resource.id;
    const paypalStatus = event.resource.status;
    const email = event.resource.subscriber.email_address;

    console.log(
      "Event:",
      eventType,
      "| Id:",
      subId,
      "| Status:",
      paypalStatus,
      "| Email:",
      email
    );

    let role;
    let payment;
    let subscriptionId;
    let status;

    if (!email || !subId || !paypalStatus || !eventType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    switch (eventType) {
      case "BILLING.SUBSCRIPTION.ACTIVATED":
        role = Role.Paid;
        subscriptionId = subId;
        payment = Payment.PayPal;
        if (paypalStatus === "ACTIVE") status = Status.Active;
        break;
      case "BILLING.SUBSCRIPTION.SUSPENDED":
        role = Role.Private;
        subscriptionId = subId;
        payment = Payment.PayPal;
        if (paypalStatus === "SUSPENDED") status = Status.Suspended;
        break;
      case "BILLING.SUBSCRIPTION.CANCELLED":
      case "BILLING.SUBSCRIPTION.EXPIRED":
        role = Role.Private;
        subscriptionId = "none";
        payment = Payment.Free;
        if (paypalStatus === "CANCELLED" || paypalStatus === "EXPIRED")
          status = Status.Inactive;
        break;
      default:
        return NextResponse.json(
          { message: "Unhandled event type" },
          { status: 400 }
        );
    }

    const editUserDTO = {
      role,
      payment,
      subscriptionId,
      status,
    };

    await editUserByEmail(email, editUserDTO);

    return NextResponse.json({ message: "Webhook received." }, { status: 200 });
  } catch (error: any) {
    console.error("PayPal Webhook Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
