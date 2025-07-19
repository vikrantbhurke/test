import { Comment } from "./model";
import { Sort } from "@/global/enums";
import { SaveCommentDTO } from "./schema";
import * as db from "@/global/utilities";
import { GetManyDTO } from "@/global/utilities";
import { Order, SearchMode, Size, Type } from "@/global/enums";

const filter = {};
const type = Type.Paged;
const size = Size.Twelve;
const sort = Sort.Created;
const mode = SearchMode.Or;
const order = Order.Descending;
const searchFields = ["body"];
const select = "body bookId commenterId";
const populate = ["bookId", "commenterId"];
const populateSelect = ["title", "username"];

export async function saveComment(saveCommentDTO: SaveCommentDTO) {
  await db.saveOne(Comment, saveCommentDTO);
}

export async function countComments(filter: any) {
  return await db.countDocs(Comment, filter);
}

export async function getComments(getManyDTO: GetManyDTO) {
  return await db.getMany(Comment, {
    ...getManyDTO,
    filter: getManyDTO.filter || filter,
    type: getManyDTO.type || type,
    size: getManyDTO.size || size,
    sort: getManyDTO.sort || sort,
    mode: getManyDTO.mode || mode,
    order: getManyDTO.order || order,
    select: getManyDTO.select || select,
    populate: getManyDTO.populate || populate,
    searchFields: getManyDTO.searchFields || searchFields,
    populateSelect: getManyDTO.populateSelect || populateSelect,
  });
}

export async function dropCommentById(id: string) {
  await db.dropOne(Comment, { _id: id });
}

export async function dropCommentsByBookId(bookId: string, session?: any) {
  await db.dropMany(Comment, { bookId }, session);
}

export async function dropCommentsByCommenterId(
  commenterId: string,
  session?: any
) {
  await db.dropMany(Comment, { commenterId }, session);
}

export async function dropComments(session?: any) {
  await db.dropMany(Comment, {}, session);
}
