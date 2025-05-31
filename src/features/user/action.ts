"use server";
import {
  EditUserDTO,
  SignUpUserDTO,
  EditUserSchema,
  SignUpUserSchema,
  SignInUserSchema,
  SignInUserDTO,
} from "./schema";
import { userService } from "..";
import { signIn, signOut } from "@/auth";
import { Exception } from "@/global/classes";
import { Provider } from "./enums";

export const signUpUsers = async (signUpUsersDTO: SignUpUserDTO[]) => {
  const result = SignUpUserSchema.array().safeParse(signUpUsersDTO);
  if (!result.success) return Exception.getZodError(result);

  try {
    await userService.signUpUsers(result.data);
    return { success: true, message: "Profiles created successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const signUpUser = async (
  provider: Provider,
  signUpUserDTO: SignUpUserDTO
) => {
  const result = SignUpUserSchema.safeParse(signUpUserDTO);
  if (!result.success) return Exception.getZodError(result);

  try {
    await userService.signUpUser(provider, result.data);
    return { success: true, message: "Profile created successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const signInWithCreds = async (signInUserDTO: SignInUserDTO) => {
  const result = SignInUserSchema.safeParse(signInUserDTO);
  if (!result.success) return Exception.getZodError(result);

  try {
    const response = await signIn("credentials", {
      ...result.data,
      redirect: false,
    });

    if (response?.error)
      return { success: false, error: response.error, issues: undefined };

    return { success: true, message: "Welcome back!" };
  } catch (error: any) {
    if (error.type === "CredentialsSignin") {
      return {
        success: false,
        error: "Something went wrong. Please try again later.",
        issues: undefined,
      };
    }

    if (error.type === "CallbackRouteError") {
      return {
        success: false,
        error: error.cause.err.message,
        issues: undefined,
      };
    }

    throw error;
  }
};

export const signInWithOAuth = async (
  provider: "google" | "github" | "apple"
) => {
  try {
    await signIn(provider);
  } catch (error: any) {
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut({ redirect: false });
    return { success: true, message: "Logged out successfully." };
  } catch (error: any) {
    console.error("Sign out error:", error);
    return {
      success: false,
      error: "Failed to log out.",
      issues: undefined,
    };
  }
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    const isValid = await userService.validatePassword(
      password,
      hashedPassword
    );

    return { success: true, data: isValid };
  } catch (error: any) {
    throw error;
  }
};

// export const verifyAccount = async () => {};

// export const forgotPassword = async () => {};

export const getUserById = async (id: string) => {
  try {
    const user = await userService.getUserById(id);
    return { success: true, data: user };
  } catch (error: any) {
    throw error;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await userService.getUserByUsername(username);
    return { success: true, data: user };
  } catch (error: any) {
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await userService.getUserByEmail(email);
    return { success: true, data: user };
  } catch (error: any) {
    throw error;
  }
};

export const editUserById = async (id: string, editUserDTO: EditUserDTO) => {
  const result = EditUserSchema.safeParse(editUserDTO);
  if (!result.success) return Exception.getZodError(result);

  try {
    await userService.editUserById(id, result.data);
    return { success: true, message: "Profile updated successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const editUserByEmail = async (
  email: string,
  editUserDTO: EditUserDTO
) => {
  const result = EditUserSchema.safeParse(editUserDTO);
  if (!result.success) return Exception.getZodError(result);

  try {
    await userService.editUserByEmail(email, result.data);
    return { success: true, message: "Profile updated successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const editEmailById = async (id: string, email: string) => {
  try {
    await userService.editEmailById(id, email);
    return { success: true, message: "Email updated successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const editAvatarById = async (id: string, avatar: string) => {
  try {
    await userService.editAvatarById(id, avatar);
    return { success: true, message: "Avatar updated successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const pushProviderById = async (id: string, provider: string) => {
  try {
    await userService.pushProviderById(id, provider);
    return { success: true, message: "Provider added successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const pullProviderById = async (id: string, provider: string) => {
  try {
    await userService.pullProviderById(id, provider);
    return { success: true, message: "Provider removed successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const setFavBookIdById = async (id: string, favBookId: string) => {
  try {
    await userService.setFavBookIdById(id, favBookId);
    return { success: true, message: "Book set as favorite successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const unsetFavBookIdById = async (id: string) => {
  try {
    await userService.unsetFavBookIdById(id);
    return { success: true, message: "Favorite book unset successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const dropUserById = async (id: string) => {
  try {
    await userService.dropUserById(id);
    return { success: true, message: "Profile deleted successfully." };
  } catch (error: any) {
    throw error;
  }
};
