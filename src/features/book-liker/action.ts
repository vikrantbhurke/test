"use server";
import * as repo from "./repository";
import * as book from "../book/action";
import { BookLikerDTO } from "./schema";
import * as fun from "@/global/utilities";

export async function saveBookLiker(bookLikerDTO: BookLikerDTO) {
  try {
    await fun.runAtomic(async (session) => {
      await book.likeBook(bookLikerDTO.bookId, session);
      await repo.saveBookLiker(bookLikerDTO, session);
    });
  } catch (error: any) {
    throw error;
  }
}

export async function checkBookLiker(bookLikerDTO: BookLikerDTO) {
  try {
    return await repo.checkBookLiker(bookLikerDTO);
  } catch (error: any) {
    throw error;
  }
}

export async function checkBookLikers(bookLikersDTO: BookLikerDTO[]) {
  try {
    return await repo.checkBookLikers(bookLikersDTO);
  } catch (error: any) {
    throw error;
  }
}

export async function dropBookLiker(bookLikerDTO: BookLikerDTO) {
  try {
    await fun.runAtomic(async (session) => {
      await book.unlikeBook(bookLikerDTO.bookId, session);
      await repo.dropBookLiker(bookLikerDTO, session);
    });
  } catch (error: any) {
    throw error;
  }
}

export async function dropBookLikersByLikerId(likerId: string, session?: any) {
  try {
    await repo.dropBookLikersByLikerId(likerId, session);
  } catch (error: any) {
    throw error;
  }
}

export async function dropBookLikersByBookId(bookId: string, session?: any) {
  try {
    await repo.dropBookLikersByBookId(bookId, session);
  } catch (error: any) {
    throw error;
  }
}

export async function dropBookLikers(session?: any) {
  try {
    await repo.dropBookLikers(session);
    return "Book unliked successfully.";
  } catch (error: any) {
    throw error;
  }
}
