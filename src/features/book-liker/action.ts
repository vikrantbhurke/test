"use server";
import { bookLikerService } from "..";
import { Exception } from "@/global/classes";
import { BookLikerDTO, BookLikerSchema } from "./schema";

export const saveBookLiker = async (bookLikerDTO: BookLikerDTO) => {
  const result = BookLikerSchema.safeParse(bookLikerDTO);
  if (!result.success) return Exception.getZodError(result);

  try {
    await bookLikerService.saveBookLiker(result.data);
    return { success: true, message: "Book liked successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const checkBookLiker = async (bookLikerDTO: BookLikerDTO) => {
  try {
    const exists = await bookLikerService.checkBookLiker(bookLikerDTO);
    return { success: true, exists };
  } catch (error: any) {
    throw error;
  }
};

export const checkBookLikers = async (bookLikersDTO: BookLikerDTO[]) => {
  try {
    const existsArray = await bookLikerService.checkBookLikers(bookLikersDTO);
    return { success: true, existsArray };
  } catch (error: any) {
    throw error;
  }
};

export const dropBookLiker = async (bookLikerDTO: BookLikerDTO) => {
  const result = BookLikerSchema.safeParse(bookLikerDTO);
  if (!result.success) return Exception.getZodError(result);

  try {
    await bookLikerService.dropBookLiker(result.data);
    return { success: true, message: "Book unliked successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const dropBookLikersByLikerId = async (likerId: string) => {
  try {
    await bookLikerService.dropBookLikersByLikerId(likerId);
    return { success: true, message: "All books unliked successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const dropBookLikersByBookId = async (bookId: string) => {
  try {
    await bookLikerService.dropBookLikersByBookId(bookId);
    return { success: true, message: "All likers removed successfully." };
  } catch (error: any) {
    throw error;
  }
};
