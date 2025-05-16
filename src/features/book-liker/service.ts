import { BookLikerDTO } from "./schema";
import { Service } from "@/global/classes";
import { BookService, BookLikerRepository } from "..";

export class BookLikerService extends Service {
  bookService: BookService;
  bookLikerRepository: BookLikerRepository;

  setBookService(bookService: BookService) {
    this.bookService = bookService;
  }

  setBookLikerRepository(bookLikerRepository: BookLikerRepository) {
    this.bookLikerRepository = bookLikerRepository;
  }

  async saveBookLiker(bookLikerDTO: BookLikerDTO) {
    await this.runAtomic(async (session) => {
      await this.bookService.likeBook(bookLikerDTO.bookId, session);
      await this.bookLikerRepository.saveBookLiker(bookLikerDTO, session);
    });
  }

  async checkBookLiker(bookLikerDTO: BookLikerDTO) {
    return await this.bookLikerRepository.checkBookLiker(bookLikerDTO);
  }

  async dropBookLiker(bookLikerDTO: BookLikerDTO) {
    await this.runAtomic(async (session) => {
      await this.bookService.unlikeBook(bookLikerDTO.bookId, session);
      await this.bookLikerRepository.dropBookLiker(bookLikerDTO, session);
    });
  }

  async dropBookLikersByLikerId(likerId: string, session?: any) {
    await this.bookLikerRepository.dropBookLikersByLikerId(likerId, session);
  }

  async dropBookLikersByBookId(bookId: string, session?: any) {
    await this.bookLikerRepository.dropBookLikersByBookId(bookId, session);
  }

  async dropBookLikers(session?: any) {
    await this.bookLikerRepository.dropBookLikers(session);
  }
}
