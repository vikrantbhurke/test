import { EditMode, Order, SearchMode, Size, Type } from "@/global/enums";
import { Comment } from "./model";
import { SaveCommentDTO, EditCommentDTO } from "./schema";
import { Repository, GetManyDTO } from "@/global/classes";
import { Sort } from "../book/enums";

export class CommentRepository extends Repository {
  filter = {};
  type = Type.Paged;
  size = Size.Large;
  sort = Sort.Created;
  mode = SearchMode.Or;
  order = Order.Descending;
  searchFields = ["body"];
  select = "body bookId commenterId";
  populate = ["bookId", "commenterId"];
  populateSelect = ["title", "username"];

  async saveComment(saveCommentDTO: SaveCommentDTO) {
    await this.saveOne(Comment, saveCommentDTO);
  }

  async editCommentById(id: string, editCommentDTO: EditCommentDTO) {
    await this.editOne(Comment, {
      filter: { _id: id },
      update: editCommentDTO,
      mode: EditMode.Set,
    });
  }

  async countComments(filter: any) {
    return await this.countDocs(Comment, filter);
  }

  async getComments(getManyDTO: GetManyDTO) {
    return await this.getMany(Comment, {
      ...getManyDTO,
      type: getManyDTO.type || this.type,
      sort: getManyDTO.sort || this.sort,
      size: getManyDTO.size || this.size,
      mode: getManyDTO.mode || this.mode,
      order: getManyDTO.order || this.order,
      filter: getManyDTO.filter || this.filter,
      select: getManyDTO.select || this.select,
      populate: getManyDTO.populate || this.populate,
      searchFields: getManyDTO.searchFields || this.searchFields,
      populateSelect: getManyDTO.populateSelect || this.populateSelect,
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
