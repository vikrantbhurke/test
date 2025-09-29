import { Book } from "./model";
import { Genre } from "./enums";
import * as db from "@/global/utilities";
import { GetManyDTO } from "@/global/utilities";
import { EditBookDTO, SaveBookDTO } from "./schema";
import { EditMode, Order, SearchMode, Size, Type } from "@/global/enums";

const filter = {};
const type = Type.Paged;
const size = Size.Twelve;
const sort = "title";
const mode = SearchMode.Or;
const order = Order.Ascending;
const populate = ["authorId"];
const searchFields = ["title", "synopsis"];
const populateSelect = ["firstname lastname username avatar"];
const select = "title synopsis authorId likes votes voterIds tags genre";

export async function saveBooks(saveBooksDTO: SaveBookDTO[]) {
  await db.saveMany(Book, saveBooksDTO);
}

export async function saveBook(saveBookDTO: SaveBookDTO) {
  await db.saveOne(Book, saveBookDTO);
}

export async function checkBook(title: string) {
  return await db.checkDoc(Book, { title });
}

export async function countBooks() {
  return await db.countDocs(Book);
}

export async function countBooksByAuthorId(authorId: string) {
  return await db.countDocs(Book, { authorId });
}

export async function getBookById(id: string) {
  // const key = `book:${id}`;
  // const cachedBook = await db.getCache(key);
  // if (cachedBook) return JSON.parse(cachedBook);

  const dbBook = await db.getOne(Book, {
    conditions: { _id: id },
    select,
    populate,
    populateSelect,
  });

  // if (dbBook) await db.setCache(key, dbBook);
  return dbBook;
}

export async function getBookByTitle(title: string, session?: any) {
  return await db.getOne(
    Book,
    {
      conditions: { title },
      select,
      populate,
      populateSelect,
    },
    session
  );
}

export async function getBookByIndex(index: number) {
  return await db.getOne(Book, {
    index,
    select,
    populate,
    populateSelect,
  });
}

export async function getBooks(getManyDTO: GetManyDTO) {
  return await db.getMany(Book, {
    ...getManyDTO,
    filter: getManyDTO.filter || filter,
    type: getManyDTO.type || type,
    size: getManyDTO.size || size,
    sort: getManyDTO.sort || sort,
    mode: getManyDTO.mode || mode,
    order: getManyDTO.order || order,
    select: getManyDTO.select || select,
    populate: getManyDTO.populate || populate,
    populateSelect: getManyDTO.populateSelect || populateSelect,
    searchFields: getManyDTO.searchFields || searchFields,
  });
}

export async function editBookById(id: string, editBookDTO: EditBookDTO) {
  // const { modifiedCount } =
  await db.editOne(Book, {
    filter: { _id: id },
    mode: EditMode.Set,
    update: editBookDTO,
  });

  // if (modifiedCount) await db.delCache(`book:${id}`);
}

export async function editBookByTitle(title: string, editBookDTO: EditBookDTO) {
  // const { modifiedCount } =
  await db.editOne(Book, {
    filter: { title },
    mode: EditMode.Set,
    update: editBookDTO,
  });

  // if (modifiedCount) {
  //   const book = await getBookByTitle(title);
  //   if (book) await db.delCache(`book:${book.id}`);
  // }
}

export async function editBooksByGenre(genre: Genre, editBookDTO: EditBookDTO) {
  // const { modifiedCount } =
  await db.editMany(Book, {
    filter: { genre },
    mode: EditMode.Set,
    update: editBookDTO,
  });

  // if (modifiedCount) await db.delPrefixCache("book:*");
}

export async function likeBook(id: string, session?: any) {
  // const { modifiedCount } =
  await db.editOne(
    Book,
    {
      filter: { _id: id },
      mode: EditMode.Inc,
      numberField: "likes",
    },
    session
  );

  // if (modifiedCount) await db.delCache(`book:${id}`);
}

export async function unlikeBook(id: string, session?: any) {
  // const { modifiedCount } =
  await db.editOne(
    Book,
    {
      filter: { _id: id },
      mode: EditMode.Dec,
      numberField: "likes",
    },
    session
  );

  // if (modifiedCount) await db.delCache(`book:${id}`);
}

export async function addTag(id: string, tag: string) {
  // const { modifiedCount } =
  await db.editOne(Book, {
    filter: { _id: id },
    mode: EditMode.Push,
    arrayField: "tags",
    element: tag,
  });

  // if (modifiedCount) await db.delCache(`book:${id}`);
}

export async function removeTag(id: string, tag: string) {
  // const { modifiedCount } =
  await db.editOne(Book, {
    filter: { _id: id },
    mode: EditMode.Pull,
    arrayField: "tags",
    element: tag,
  });

  // if (modifiedCount) await db.delCache(`book:${id}`);
}

export async function upvoteBook(id: string, voterId: string) {
  // const { modifiedCount } =
  await db.editOne(Book, {
    filter: { _id: id },
    mode: EditMode.IncPush,
    numberField: "votes",
    arrayField: "voterIds",
    element: voterId,
  });

  // if (modifiedCount) await db.delCache(`book:${id}`);
}

export async function downvoteBook(id: string, voterId: string) {
  // const { modifiedCount } =
  await db.editOne(Book, {
    filter: { _id: id },
    mode: EditMode.DecPull,
    numberField: "votes",
    arrayField: "voterIds",
    element: voterId,
  });

  // if (modifiedCount) await db.delCache(`book:${id}`);
}

export async function downvoteBooksByVoterId(voterId: string, session?: any) {
  // const { modifiedCount } =
  await db.editMany(
    Book,
    {
      filter: { voterIds: voterId },
      mode: EditMode.DecPull,
      numberField: "votes",
      arrayField: "voterIds",
      element: voterId,
    },
    session
  );

  // if (modifiedCount) await db.delPrefixCache("book:*");
}

export async function dropBookById(id: string, session?: any) {
  // const { deletedCount } =
  await db.dropOne(Book, { _id: id }, session);
  // if (deletedCount) await db.delCache(`book:${id}`);
}

export async function dropBookByTitle(title: string, session?: any) {
  // const { deletedCount } =
  await db.dropOne(Book, { title }, session);

  // if (deletedCount) {
  //   const book = await getBookByTitle(title, session);
  //   if (book) await db.delCache(`book:${book.id}`);
  // }
}

export async function dropBooksByAuthorId(authorId: string, session?: any) {
  // const { deletedCount } =
  await db.dropMany(Book, { authorId }, session);
  // if (deletedCount) await db.delPrefixCache("book:*");
}

export async function dropBooks(session?: any) {
  // const { deletedCount } =
  await db.dropMany(Book, {}, session);
  // if (deletedCount) await db.delPrefixCache("book:*");
}
