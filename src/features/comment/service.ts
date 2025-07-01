import { CommentRepository } from "..";
import { SaveCommentDTO, EditCommentDTO } from "./schema";
import { Service, GetManyDTO } from "@/global/classes";

export class CommentService extends Service {
  commentRepository: CommentRepository;

  setCommentRepository(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  async saveComment(saveCommentDTO: SaveCommentDTO) {
    await this.commentRepository.saveComment(saveCommentDTO);
  }

  async editCommentById(id: string, editCommentDTO: EditCommentDTO) {
    await this.commentRepository.editCommentById(id, editCommentDTO);
  }

  async countComments(filter: any) {
    return await this.commentRepository.countComments(filter);
  }

  async getComments(getManyDTO: GetManyDTO) {
    return await this.commentRepository.getComments(getManyDTO);
  }

  async dropCommentById(id: string) {
    await this.commentRepository.dropCommentById(id);
  }

  async dropCommentsByBookId(bookId: string, session?: any) {
    await this.commentRepository.dropCommentsByBookId(bookId, session);
  }

  async dropCommentsByCommenterId(commenterId: string, session?: any) {
    await this.commentRepository.dropCommentsByCommenterId(
      commenterId,
      session
    );
  }

  async dropComments(session?: any) {
    await this.commentRepository.dropComments(session);
  }
}
