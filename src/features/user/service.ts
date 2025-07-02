import {
  BookService,
  UserRepository,
  CommentService,
  BookLikerService,
} from "../di";
import bcrypt from "bcryptjs";
import { Provider } from "./enums";
import jsonwebtoken from "jsonwebtoken";
import { Service } from "@/global/classes";
import { TemplateVariables } from "mailtrap";
import { Template } from "@/global/constants";
import connectCloudinary from "@/global/configurations/cloudinary";
import { SignUpUserDTO, EditUserDTO, ResetPasswordDTO } from "./schema";

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

  async sendEmail(
    recipient: string,
    template: any,
    variables: TemplateVariables
  ) {
    const { id, subject, filename } = template;

    if (process.env.NODE_ENV === "production") {
      const { sendEmailProd } = await import("./modules/send-email-prod");
      await sendEmailProd(id, recipient, variables);
    } else {
      const { sendEmailDev } = await import("./modules/send-email-dev");
      await sendEmailDev(filename, recipient, subject, variables);
    }
  }

  async generateToken(payload: any) {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1d",
    });
  }

  async verifyToken(token: string) {
    try {
      return jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY as string);
    } catch (err) {
      console.error("⛔ Token Verification Error:", err);
      return null;
    }
  }

  async encryptPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async validatePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  async verifyAccount(token: string) {
    if (!token) throw new Error("Invalid or expired token.");
    // @ts-expect-error...
    const { username } = await this.verifyToken(token);
    const user = await this.getUserByUsername(username as any);
    if (user.isVerified) throw new Error("Email already verified.");
    await this.editUserById(user.id, { isVerified: true });
  }

  async signUpUsers(signUpUsersDTO: SignUpUserDTO[]) {
    for (const signUpUserDTO of signUpUsersDTO)
      await this.signUpUser(Provider.credentials, signUpUserDTO);
  }

  async requestEmail({ email }: any) {
    const user = await this.getUserByEmail(email);
    if (!user) throw new Error("Account with this email does not exist.");
    const token = await this.generateToken({ username: user.username });

    await this.sendEmail(email, Template.Password, {
      token,
      name: user.firstname,
      email: user.email,
      url: process.env.APP_URL as string,
      app: process.env.APP_NAME as string,
    });

    return { success: true, message: "Verification email sent." };
  }

  async resetPassword(token: string, { password }: ResetPasswordDTO) {
    if (!token) throw new Error("Invalid or expired token.");
    // @ts-expect-error...
    const { username } = await this.verifyToken(token);
    const user = await this.getUserByUsername(username as any);
    if (!user) throw new Error("Account with this username does not exist.");
    const hashedPassword = await this.encryptPassword(password);
    await this.editUserById(user.id, { hashedPassword });
  }

  async signUpUser(provider: Provider, signUpUserDTO: SignUpUserDTO) {
    const { firstname, username, email } = signUpUserDTO;
    const u1 = await this.getUserByUsername(username);
    const u2 = await this.getUserByEmail(email);

    if (u1)
      throw new Error(`Account with username ${username} already exists.`);

    if (u2) throw new Error(`Account with email ${email} already exists.`);

    const newUser = {
      ...signUpUserDTO,
      provider,
      hashedPassword: await this.encryptPassword(signUpUserDTO.password),
    };

    await this.userRepository.signUpUser(newUser);
    const token = await this.generateToken({ username });

    await this.sendEmail(email, Template.Welcome, {
      token,
      name: firstname,
      url: process.env.APP_URL as string,
      app: process.env.APP_NAME as string,
    });
  }

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

  async editAvatarById(id: string, secure_url: string, public_id: string) {
    await this.userRepository.editAvatarById(id, secure_url, public_id);
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
    const user = await this.getUserById(id);
    if (!user) throw new Error("User not found.");

    await this.runAtomic(async (session) => {
      await this.userRepository.dropUserById(id, session);
      await this.bookService.dropBooksByAuthorId(id, session);
      await this.bookService.downvoteBooksByVoterId(id, session);
      await this.commentService.dropCommentsByCommenterId(id, session);
      await this.bookLikerService.dropBookLikersByLikerId(id, session);
    });

    const cloudinary = await connectCloudinary();
    await cloudinary.uploader.destroy(user.avatar.publicId);
  }
}
