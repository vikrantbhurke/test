"use server";
import {
  EditUserDTO,
  SignUpUserDTO,
  SignInUserDTO,
  RequestEmailDTO,
  ResetPasswordDTO,
} from "./schema";
import { userService } from "../di";
import { Provider, Role } from "./enums";
import { auth, signIn, signOut } from "@/auth";
import { TemplateVariables } from "mailtrap";
import { Payment } from "../payment/enums";

export const getAuth = async () => {
  const session = await auth();
  const id = session ? session.user.id : null;
  const subId = session ? session.user.subscriptionId : null;
  const provider = session ? session.user.provider : [];
  const name = session ? session.user.name : null;
  const image = session ? session.user.image : null;
  const payment = session ? (session.user.payment as Payment) : Payment.Free;
  const role = session ? (session.user.role as Role) : Role.Public;
  return { id, role, subId, payment, name, image, provider };
};

export const sendEmail = async (
  recipient: string,
  template: any,
  variables: TemplateVariables
) => {
  try {
    await userService.sendEmail(recipient, template, variables);
    return "Email sent successfully.";
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      issues: undefined,
    };
  }
};

export const requestEmail = async (requestEmailDTO: RequestEmailDTO) => {
  try {
    await userService.requestEmail(requestEmailDTO);
    return "Check your email for password reset link.";
  } catch (error: any) {
    throw error;
  }
};

export const resetPassword = async (
  token: string,
  resetPasswordDTO: ResetPasswordDTO
) => {
  try {
    await userService.resetPassword(token, resetPasswordDTO);
    return "Password reset successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const generateToken = async (payload: any) => {
  try {
    return await userService.generateToken(payload);
  } catch (error: any) {
    throw error;
  }
};

export const verifyAccount = async (token: string) => {
  try {
    await userService.verifyAccount(token);
    return "Account verified successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const signUpUsers = async (signUpUsersDTO: SignUpUserDTO[]) => {
  try {
    await userService.signUpUsers(signUpUsersDTO);
    return "Profiles created successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const signUpUser = async (
  provider: Provider,
  signUpUserDTO: SignUpUserDTO
) => {
  try {
    await userService.signUpUser(provider, signUpUserDTO);
    return "Profile created successfully. Check your email for account verification link.";
  } catch (error: any) {
    throw error;
  }
};

export const signInWithCreds = async (signInUserDTO: SignInUserDTO) => {
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
};

export const signInWithOAuth = async (
  provider: "google" | "github" | "apple" | "linkedin" | "twitter"
) => {
  try {
    await signIn(provider);
  } catch (error: any) {
    const message = error?.cause?.err?.message || null;
    if (message) throw new Error(message);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut({ redirect: false });
    return "Logged out successfully.";
  } catch (error: any) {
    console.error("⛔ Sign out error:", error);
    throw new Error("⛔ Failed to log out.");
  }
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    return await userService.validatePassword(password, hashedPassword);
  } catch (error: any) {
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await userService.getUserById(id);
  } catch (error: any) {
    throw error;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    return await userService.getUserByUsername(username);
  } catch (error: any) {
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await userService.getUserByEmail(email);
  } catch (error: any) {
    throw error;
  }
};

export const editUserById = async (id: string, editUserDTO: EditUserDTO) => {
  try {
    await userService.editUserById(id, editUserDTO);
    return "Profile updated successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const editUserByEmail = async (
  email: string,
  editUserDTO: EditUserDTO
) => {
  try {
    await userService.editUserByEmail(email, editUserDTO);
    return "Profile updated successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const editEmailById = async (id: string, email: string) => {
  try {
    await userService.editEmailById(id, email);
    return "Email updated successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const editAvatarById = async (
  id: string,
  secure_url: string,
  public_id: string
) => {
  try {
    await userService.editAvatarById(id, secure_url, public_id);
    return "Avatar updated successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const setFavBookIdById = async (id: string, favBookId: string) => {
  try {
    await userService.setFavBookIdById(id, favBookId);
    return "Book set as favorite successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const unsetFavBookIdById = async (id: string) => {
  try {
    await userService.unsetFavBookIdById(id);
    return "Favorite book unset successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const dropUserById = async (id: string) => {
  try {
    await userService.dropUserById(id);
    return "Profile deleted successfully.";
  } catch (error: any) {
    throw error;
  }
};
