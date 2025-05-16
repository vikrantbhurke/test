import {
  BookService,
  UserRepository,
  CommentService,
  BookLikerService,
} from "..";
import { Service } from "@/global/classes";
import { SignUpUserDTO, EditUserDTO } from "./schema";

export class UserService extends Service {
  userRepository: UserRepository;
  commentService: CommentService;
  bookService: BookService;
  bookLikerService: BookLikerService;

  setUserRepository(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  setBookLikerService(bookLikerService: BookLikerService) {
    this.bookLikerService = bookLikerService;
  }

  setBookService(bookService: BookService) {
    this.bookService = bookService;
  }

  setCommentService(commentService: CommentService) {
    this.commentService = commentService;
  }

  async signUpUsers(signUpUsersDTO: SignUpUserDTO[]) {
    for (const signUpUserDTO of signUpUsersDTO)
      await this.signUpUser(signUpUserDTO);
  }

  async signUpUser(signUpUserDTO: SignUpUserDTO) {
    const newUser = {
      ...signUpUserDTO,
      hashedPassword: signUpUserDTO.password, // TODO: Hash password here
    };

    await this.userRepository.signUpUser(newUser);
  }

  // async signInUser() {}

  // async verifyAccount() {}

  // async verifyEmail() {}

  async getUserById(id: string) {
    return await this.userRepository.getUserById(id);
  }

  async getUserByUsername(username: string) {
    return await this.userRepository.getUserByUsername(username);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }

  async editUserById(id: string, editUserDTO: EditUserDTO) {
    await this.userRepository.editUserById(id, editUserDTO);
  }

  async editUserByEmail(email: string, editUserDTO: EditUserDTO) {
    await this.userRepository.editUserByEmail(email, editUserDTO);
  }

  async editEmailById(id: string, email: string) {
    await this.userRepository.editEmailById(id, email);
  }

  async editAvatarById(id: string, avatar: string) {
    await this.userRepository.editAvatarById(id, avatar);
  }

  async setFavBookIdById(id: string, favBookId: string) {
    await this.userRepository.setFavBookIdById(id, favBookId);
  }

  async unsetFavBookIdById(id: string) {
    await this.userRepository.unsetFavBookIdById(id);
  }

  async unsetFavBookIdByFavBookId(favBookId: string, session?: any) {
    await this.userRepository.unsetFavBookIdByFavBookId(favBookId, session);
  }

  async unsetFavBookIdFromAll(session?: any) {
    await this.userRepository.unsetFavBookIdFromAll(session);
  }

  async dropUserById(id: string) {
    await this.runAtomic(async (session) => {
      await this.userRepository.dropUserById(id, session);
      await this.bookService.dropBooksByAuthorId(id, session);
      await this.bookService.downvoteBooksByVoterId(id, session);
      await this.commentService.dropCommentsByCommenterId(id, session);
      await this.bookLikerService.dropBookLikersByLikerId(id, session);
    });
  }
}
