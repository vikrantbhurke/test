import { BookLiker } from "./model";
import { BookLikerDTO } from "./schema";
import { Repository } from "@/global/classes";

export class BookLikerRepository extends Repository {
  async saveBookLiker(bookLikerDTO: BookLikerDTO, session?: any) {
    await this.saveOne(BookLiker, bookLikerDTO, session);
  }

  async checkBookLiker(bookLikerDTO: BookLikerDTO) {
    return await this.checkDoc(BookLiker, bookLikerDTO);
  }

  async dropBookLiker(bookLikerDTO: BookLikerDTO, session?: any) {
    await this.dropOne(BookLiker, bookLikerDTO, session);
  }

  async dropBookLikersByLikerId(likerId: string, session?: any) {
    await this.dropMany(BookLiker, { likerId }, session);
  }

  async dropBookLikersByBookId(bookId: string, session?: any) {
    await this.dropMany(BookLiker, { bookId }, session);
  }

  async dropBookLikers(session?: any) {
    await this.dropMany(BookLiker, session);
  }
}
