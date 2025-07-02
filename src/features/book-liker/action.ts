"use server";
import { bookLikerService } from "../di";
import { BookLikerDTO } from "./schema";

export const saveBookLiker = async (bookLikerDTO: BookLikerDTO) => {
  try {
    await bookLikerService.saveBookLiker(bookLikerDTO);
    return "Book liked successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const checkBookLiker = async (bookLikerDTO: BookLikerDTO) => {
  try {
    return await bookLikerService.checkBookLiker(bookLikerDTO);
  } catch (error: any) {
    throw error;
  }
};

export const checkBookLikers = async (bookLikersDTO: BookLikerDTO[]) => {
  try {
    return await bookLikerService.checkBookLikers(bookLikersDTO);
  } catch (error: any) {
    throw error;
  }
};

export const dropBookLiker = async (bookLikerDTO: BookLikerDTO) => {
  try {
    await bookLikerService.dropBookLiker(bookLikerDTO);
    return "Book unliked successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const dropBookLikersByLikerId = async (likerId: string) => {
  try {
    await bookLikerService.dropBookLikersByLikerId(likerId);
    return "All books unliked successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const dropBookLikersByBookId = async (bookId: string) => {
  try {
    await bookLikerService.dropBookLikersByBookId(bookId);
    return "All likers removed successfully.";
  } catch (error: any) {
    throw error;
  }
};
