import {
  sendEmail,
  signUpUser,
  generateToken,
  getUserByEmail,
  validatePassword,
  getUserByUsername,
} from "./features/user/action";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
// import LinkedIn from "next-auth/providers/linkedin";
import Credentials from "next-auth/providers/credentials";
import { Gender, Provider } from "./features/user/enums";
import { Template } from "./global/constants";

export const config = {
  providers: [
    GitHub,
    Google,
    // LinkedIn,
    Credentials({
      authorize: async (credentials) => {
        if (!credentials) return null;
        const user = await getUserByUsername(credentials.username as string);
        if (!user) throw new Error("Account with this username not found.");

        if (user.provider !== "credentials") {
          const provider =
            user.provider.charAt(0).toUpperCase() +
            user.provider.slice(1);

          const errorMessage = `Account associated with ${provider} found. Sign in with ${provider} instead.`;
          throw new Error(errorMessage);
        }

        const isValid = await validatePassword(
          credentials.password as string,
          user.hashedPassword
        );

        if (!isValid) throw new Error("Invalid password.");

        if (!user.isVerified) {
          const token = await generateToken({ username: user.username });

          await sendEmail(user.email, Template.Welcome, {
            token,
            name: user.firstname,
            url: process.env.APP_URL as string,
            app: process.env.APP_NAME as string,
          });

          throw new Error(
            "Account not verified. Check your email for account verification link."
          );
        }

        return user;
      },
    }),
  ],
  pages: {
    error: "/sign-in",
  },
  callbacks: {
    async signIn({ user, account }: any) {
      if (account.provider === "credentials") return true;
      const dbUser = await getUserByEmail(user.email);

      if (!dbUser) {
        let provider;
        if (account.provider === "google") provider = Provider.google;
        else if (account.provider === "apple") provider = Provider.apple;
        else if (account.provider === "github") provider = Provider.github;
        else if (account.provider === "linkedin") provider = Provider.linkedin;
        else if (account.provider === "twitter") provider = Provider.twitter;
        else if (account.provider === "x") provider = Provider.x;
        else provider = Provider.credentials;

        await signUpUser(provider, {
          firstname: user.name.split(" ")[0] || "",
          lastname: user.name.split(" ")[1] || "",
          username: user.email.split("@")[0],
          email: user.email,
          gender: Gender.Other,
          password: "Passw0rd!",
          confirmPassword: "Passw0rd!",
          avatar: {
            secureUrl: user.image || "",
            publicId: "",
          },
        });
      } else {
        if (dbUser.provider !== account.provider) return false;
      }

      return true;
    },
    async redirect({ baseUrl }: any) {
      return baseUrl;
    },
    async session({ session }: any) {
      const user = await getUserByEmail(session.user.email);

      session.user.id = user.id;
      session.user.name =
        session.user.name || user.firstname + " " + user.lastname;
      session.user.username = user.username;
      session.user.email = user.email;
      session.user.role = user.role;
      session.user.provider = user.provider;
      session.user.image = session.user.image || user.avatar.secureUrl;
      session.user.publicId = user.avatar.publicId;
      session.user.payment = user.payment;
      session.user.subscriptionId = user.subscriptionId;

      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
