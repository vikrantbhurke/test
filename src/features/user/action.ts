"use server";
import {
  EditUserDTO,
  SignUpUserDTO,
  EditUserSchema,
  SignUpUserSchema,
} from "./schema";
import { userService } from "..";
import { Exception } from "@/global/classes";

export const signUpUsers = async (signUpUsersDTO: SignUpUserDTO[]) => {
  const result = SignUpUserSchema.array().safeParse(signUpUsersDTO);
  if (!result.success) return Exception.getZodError(result);

  try {
    await userService.signUpUsers(result.data);
    return { success: true, message: "Users created successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const signUpUser = async (signUpUserDTO: SignUpUserDTO) => {
  const result = SignUpUserSchema.safeParse(signUpUserDTO);
  if (!result.success) return Exception.getZodError(result);

  try {
    await userService.signUpUser(result.data);
    return { success: true, message: "User created successfully." };
  } catch (error: any) {
    throw error;
  }
};

// export const signInUser = async () => {};

// export const verifyAccount = async () => {};

// export const verifyEmail = async () => {};

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
    return { success: true, message: "User updated successfully." };
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
    return { success: true, message: "User updated successfully." };
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
    return { success: true, message: "User deleted successfully." };
  } catch (error: any) {
    throw error;
  }
};
