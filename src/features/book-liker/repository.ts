import { BookLiker } from "./model";
import { BookLikerDTO } from "./schema";
import * as db from "@/global/utilities";

export async function saveBookLiker(bookLikerDTO: BookLikerDTO, session?: any) {
  await db.saveOne(BookLiker, bookLikerDTO, session);
}

export async function checkBookLiker(bookLikerDTO: BookLikerDTO) {
  return await db.checkDoc(BookLiker, bookLikerDTO);
}

export async function checkBookLikers(bookLikersDTO: BookLikerDTO[]) {
  return await db.checkDocs(BookLiker, bookLikersDTO);
}

export async function dropBookLiker(bookLikerDTO: BookLikerDTO, session?: any) {
  await db.dropOne(BookLiker, bookLikerDTO, session);
}

export async function dropBookLikersByLikerId(likerId: string, session?: any) {
  await db.dropMany(BookLiker, { likerId }, session);
}

export async function dropBookLikersByBookId(bookId: string, session?: any) {
  await db.dropMany(BookLiker, { bookId }, session);
}

export async function dropBookLikers(session?: any) {
  await db.dropMany(BookLiker, {}, session);
}
