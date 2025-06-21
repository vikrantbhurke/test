import { Comment } from "./model";
import { SaveCommentDTO, EditCommentDTO } from "./schema";
import { Repo, GetManyDTO } from "@/global/classes";

const select = "body bookId commenterId";
const searchFields = ["body"];
const populate = ["bookId", "commenterId"];
const populateSelect = ["title", "username"];

export class CommentRepository extends Repo {
  async saveComment(saveCommentDTO: SaveCommentDTO) {
    await this.saveOne(Comment, saveCommentDTO);
  }

  async editCommentById(id: string, editCommentDTO: EditCommentDTO) {
    await this.editOne(Comment, {
      filter: { _id: id },
      update: editCommentDTO,
      mode: "set",
    });
  }

  async getComments(getManyDTO: GetManyDTO) {
    return await this.getMany(Comment, {
      ...getManyDTO,
      select,
      searchFields,
      populate,
      populateSelect,
    });
  }

  async dropCommentById(id: string) {
    await this.dropOne(Comment, { _id: id });
  }

  async dropCommentsByBookId(bookId: string, session?: any) {
    await this.dropMany(Comment, { bookId }, session);
  }

  async dropCommentsByCommenterId(commenterId: string, session?: any) {
    await this.dropMany(Comment, { commenterId }, session);
  }

  async dropComments(session?: any) {
    await this.dropMany(Comment, undefined, session);
  }
}
