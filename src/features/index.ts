export * from "./sitemap/action";
export * from "./book/action";
export * from "./user/action";
export * from "./comment/action";
export * from "./payment/action";
export * from "./book-liker/action";
import { SitemapService } from "./sitemap/service";
import { SitemapRepository } from "./sitemap/repository";
import { PaymentService } from "./payment/service";
import { UserService } from "./user/service";
import { UserRepository } from "./user/repository";
import { BookService } from "./book/service";
import { BookRepository } from "./book/repository";
import { CommentService } from "./comment/service";
import { CommentRepository } from "./comment/repository";
import { BookLikerService } from "./book-liker/service";
import { BookLikerRepository } from "./book-liker/repository";

const sitemapService = new SitemapService();
const sitemapRepository = new SitemapRepository();
const paymentService = new PaymentService();
const userService = new UserService();
const userRepository = new UserRepository();
const bookService = new BookService();
const bookRepository = new BookRepository();
const commentService = new CommentService();
const commentRepository = new CommentRepository();
const bookLikerService = new BookLikerService();
const bookLikerRepository = new BookLikerRepository();

sitemapService.setSitemapRepository(sitemapRepository);
userService.setUserRepository(userRepository);
userService.setBookService(bookService);
userService.setCommentService(commentService);
userService.setBookLikerService(bookLikerService);
bookService.setBookRepository(bookRepository);
bookService.setUserService(userService);
bookService.setCommentService(commentService);
bookService.setBookLikerService(bookLikerService);
commentService.setCommentRepository(commentRepository);
bookLikerService.setBookLikerRepository(bookLikerRepository);
bookLikerService.setBookService(bookService);

export {
  sitemapService,
  paymentService,
  userService,
  bookService,
  commentService,
  bookLikerService,
  SitemapService,
  UserService,
  BookService,
  CommentService,
  BookLikerService,
  SitemapRepository,
  UserRepository,
  BookRepository,
  CommentRepository,
  BookLikerRepository,
};
