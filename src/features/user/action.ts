"use server";
import {
  EditUserDTO,
  SignUpUserDTO,
  SignInUserDTO,
  RequestEmailDTO,
  ResetPasswordDTO,
} from "./schema";
import bcrypt from "bcryptjs";
import * as repo from "./repository";
import * as book from "../book/action";
import * as comment from "../comment/action";
import * as bookLiker from "../book-liker/action";
import jsonwebtoken from "jsonwebtoken";
import { Provider, Role } from "./enums";
import { Payment } from "../payment/enums";
import { TemplateVariables } from "mailtrap";
import { Template } from "@/global/constants";
import { auth, signIn, signOut } from "@/auth";
import * as fun from "@/global/utilities";
import connectCloudinary from "@/global/configurations/cloudinary";

export async function getAuth() {
  const session = await auth();
  const id = session ? session.user.id : null;
  const subId = session ? session.user.subscriptionId : null;
  const provider = session ? session.user.provider : [];
  const name = session ? session.user.name : null;
  const image = session ? session.user.image : null;
  const payment = session ? (session.user.payment as Payment) : Payment.Free;
  const role = session ? (session.user.role as Role) : Role.Public;
  return { id, role, subId, payment, name, image, provider };
}

export async function sendEmail(
  recipient: string,
  template: any,
  variables: TemplateVariables
) {
  try {
    const { id, subject, filename } = template;

    if (process.env.NODE_ENV === "production") {
      const { sendEmailProd } = await import("./modules/send-email-prod");
      await sendEmailProd(id, recipient, variables);
    } else {
      const { sendEmailDev } = await import("./modules/send-email-dev");
      await sendEmailDev(filename, recipient, subject, variables);
    }

    return "Email sent successfully.";
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      issues: undefined,
    };
  }
}

export async function generateToken(payload: any) {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    return jsonwebtoken.sign(payload, secretKey!, { expiresIn: "1d" });
  } catch (error: any) {
    throw error;
  }
}

export async function validatePassword(
  password: string,
  hashedPassword: string
) {
  try {
    return bcrypt.compareSync(password, hashedPassword);
  } catch (error: any) {
    throw error;
  }
}

export async function verifyAccount(token: string) {
  try {
    if (!token) throw new Error("Invalid or expired token.");
    // @ts-expect-error...
    const { username } = await verifyToken(token);
    const user = await getUserByUsername(username as any);
    if (user.isVerified) throw new Error("Email already verified.");
    await editUserById(user.id, { isVerified: true });
    return "Account verified successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function requestEmail(requestEmailDTO: RequestEmailDTO) {
  try {
    const user = await getUserByEmail(requestEmailDTO.email);
    if (!user) throw new Error("Account with this email does not exist.");
    const token = await generateToken({ username: user.username });

    await sendEmail(requestEmailDTO.email, Template.Password, {
      token,
      name: user.firstname,
      email: user.email,
      url: process.env.APP_URL as string,
      app: process.env.APP_NAME as string,
    });

    // return { success: true, message: "Verification email sent." };

    return "Check your email for password reset link.";
  } catch (error: any) {
    throw error;
  }
}

export async function resetPassword(
  token: string,
  { password }: ResetPasswordDTO
) {
  try {
    if (!token) throw new Error("Invalid or expired token.");
    // @ts-expect-error...
    const { username } = await verifyToken(token);
    const user = await getUserByUsername(username as any);
    if (!user) throw new Error("Account with this username does not exist.");
    const hashedPassword = await encryptPassword(password);
    await editUserById(user.id, { hashedPassword });
    return "Password reset successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function signUpUser(
  provider: Provider,
  signUpUserDTO: SignUpUserDTO
) {
  try {
    const { firstname, username, email } = signUpUserDTO;
    const u1 = await getUserByUsername(username);
    const u2 = await getUserByEmail(email);

    if (u1)
      throw new Error(`Account with username ${username} already exists.`);

    if (u2) throw new Error(`Account with email ${email} already exists.`);

    const newUser = {
      ...signUpUserDTO,
      provider,
      hashedPassword: await encryptPassword(signUpUserDTO.password),
    };

    await repo.signUpUser(newUser);
    const token = await generateToken({ username });

    await sendEmail(email, Template.Welcome, {
      token,
      name: firstname,
      url: process.env.APP_URL!,
      app: process.env.APP_NAME!,
    });

    return "Profile created successfully. Check your email for account verification link.";
  } catch (error: any) {
    throw error;
  }
}

export async function signInWithCreds(signInUserDTO: SignInUserDTO) {
  try {
    await signIn("credentials", {
      ...signInUserDTO,
      redirect: false,
    });

    return "Welcome back!";
  } catch (error: any) {
    const message = error?.cause?.err?.message || null;
    if (message) throw new Error(message);
    throw error;
  }
}

export async function signInWithOAuth(
  provider: "google" | "github" | "apple" | "linkedin" | "twitter"
) {
  try {
    await signIn(provider);
  } catch (error: any) {
    const message = error?.cause?.err?.message || null;
    if (message) throw new Error(message);
    throw error;
  }
}

export async function signOutUser() {
  try {
    await signOut({ redirect: false });
    return "Logged out successfully.";
  } catch (error: any) {
    console.error("⛔ Sign out error:", error);
    throw new Error("⛔ Failed to log out.");
  }
}

export async function verifyToken(token: string) {
  try {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY!);
  } catch (err) {
    console.error("⛔ Token Verification Error:", err);
    return null;
  }
}

export async function encryptPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export async function getUserById(id: string) {
  try {
    return await repo.getUserById(id);
  } catch (error: any) {
    throw error;
  }
}

export async function getUserByUsername(username: string) {
  try {
    return await repo.getUserByUsername(username);
  } catch (error: any) {
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    return await repo.getUserByEmail(email);
  } catch (error: any) {
    throw error;
  }
}

export async function editUserById(id: string, editUserDTO: EditUserDTO) {
  try {
    await repo.editUserById(id, editUserDTO);
    return "Profile updated successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function editUserByEmail(email: string, editUserDTO: EditUserDTO) {
  try {
    await repo.editUserByEmail(email, editUserDTO);
    return "Profile updated successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function editAvatarById(
  id: string,
  secure_url: string,
  public_id: string
) {
  try {
    await repo.editAvatarById(id, secure_url, public_id);
    return "Avatar updated successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function setFavBookIdById(id: string, favBookId: string) {
  try {
    await repo.setFavBookIdById(id, favBookId);
    return "Book set as favorite successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function unsetFavBookIdById(id: string) {
  try {
    await repo.unsetFavBookIdById(id);
    return "Favorite book unset successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function unsetFavBookIdByFavBookId(
  favBookId: string,
  session?: any
) {
  try {
    await repo.unsetFavBookIdByFavBookId(favBookId, session);
  } catch (error: any) {
    throw error;
  }
}

export async function unsetFavBookIdFromAll(session?: any) {
  try {
    await repo.unsetFavBookIdFromAll(session);
  } catch (error: any) {
    throw error;
  }
}

export async function dropUserById(id: string) {
  try {
    const user = await getUserById(id);
    if (!user) throw new Error("User not found.");

    await fun.runAtomic(async (session) => {
      await repo.dropUserById(id, session);
      await book.dropBooksByAuthorId(id, session);
      await book.downvoteBooksByVoterId(id, session);
      await comment.dropCommentsByCommenterId(id, session);
      await bookLiker.dropBookLikersByLikerId(id, session);
    });

    if (user?.avatar?.publicId) {
      const cloudinary = await connectCloudinary();
      await cloudinary.uploader.destroy(user.avatar.publicId);
    }

    return "Profile deleted successfully.";
  } catch (error: any) {
    throw error;
  }
}
