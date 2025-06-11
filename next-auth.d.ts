import { Payment } from "@/features/user/enums";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      role: string;
      provider: string;
      image: string;
      publicId: string;
      payment?: Payment;
      subscriptionId?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    username: string;
    role: string;
    provider: string;
    avatar: {
      secureUrl: string;
      publicId: string;
    };
    payment?: Payment;
    subscriptionId?: string;
  }
}
