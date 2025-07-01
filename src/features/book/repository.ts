import { Book } from "./model";
import { Genre } from "./enums";
import { EditBookDTO, SaveBookDTO } from "./schema";
import { Repository, GetManyDTO } from "@/global/classes";
import { EditMode, Order, SearchMode, Size, Type } from "@/global/enums";

export class BookRepository extends Repository {
  filter = {};
  type = Type.Paged;
  size = Size.Large;
  sort = "title";
  mode = SearchMode.Or;
  order = Order.Ascending;
  populate = ["authorId"];
  searchFields = ["title", "synopsis"];
  populateSelect = ["firstname lastname username avatar"];
  select = "title synopsis authorId likes votes voterIds tags genre";

  async saveBooks(saveBooksDTO: SaveBookDTO[]) {
    await this.saveMany(Book, saveBooksDTO);
  }

  async saveBook(saveBookDTO: SaveBookDTO) {
    await this.saveOne(Book, saveBookDTO);
  }

  async checkBook(title: string) {
    return await this.checkDoc(Book, { title });
  }

  async countBooks() {
    return await this.countDocs(Book);
  }

  async countBooksByAuthorId(authorId: string) {
    return await this.countDocs(Book, { authorId });
  }

  async getBookById(id: string) {
    const key = `book:${id}`;
    const cachedBook = await this.getCache(key);
    if (cachedBook) return JSON.parse(cachedBook);

    const dbBook = await this.getOne(Book, {
      conditions: { _id: id },
      select: this.select,
      populate: this.populate,
      populateSelect: this.populateSelect,
    });

    if (dbBook) await this.setCache(key, dbBook);
    return dbBook;
  }

  async getBookByTitle(title: string, session?: any) {
    return await this.getOne(
      Book,
      {
        conditions: { title },
        select: this.select,
        populate: this.populate,
        populateSelect: this.populateSelect,
      },
      session
    );
  }

  async getBookByIndex(index: number) {
    return await this.getOne(Book, {
      index,
      select: this.select,
      populate: this.populate,
      populateSelect: this.populateSelect,
    });
  }

  async getBooks(getManyDTO: GetManyDTO) {
    return await this.getMany(Book, {
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

  async editBookById(id: string, editBookDTO: EditBookDTO) {
    const { modifiedCount } = await this.editOne(Book, {
      filter: { _id: id },
      mode: EditMode.Set,
      update: editBookDTO,
    });

    if (modifiedCount) await this.delCache(`book:${id}`);
  }

  async editBookByTitle(title: string, editBookDTO: EditBookDTO) {
    const { modifiedCount } = await this.editOne(Book, {
      filter: { title },
      mode: EditMode.Set,
      update: editBookDTO,
    });

    if (modifiedCount) {
      const book = await this.getBookByTitle(title);
      if (book) await this.delCache(`book:${book.id}`);
    }
  }

  async editBooksByGenre(genre: Genre, editBookDTO: EditBookDTO) {
    const { modifiedCount } = await this.editMany(Book, {
      filter: { genre },
      mode: EditMode.Set,
      update: editBookDTO,
    });

    if (modifiedCount) await this.delPrefixCache("book:*");
  }

  async likeBook(id: string, session?: any) {
    const { modifiedCount } = await this.editOne(
      Book,
      {
        filter: { _id: id },
        mode: EditMode.Inc,
        numberField: "likes",
      },
      session
    );

    if (modifiedCount) await this.delCache(`book:${id}`);
  }

  async unlikeBook(id: string, session?: any) {
    const { modifiedCount } = await this.editOne(
      Book,
      {
        filter: { _id: id },
        mode: EditMode.Dec,
        numberField: "likes",
      },
      session
    );

    if (modifiedCount) await this.delCache(`book:${id}`);
  }

  async addTag(id: string, tag: string) {
    const { modifiedCount } = await this.editOne(Book, {
      filter: { _id: id },
      mode: EditMode.Push,
      arrayField: "tags",
      element: tag,
    });

    if (modifiedCount) await this.delCache(`book:${id}`);
  }

  async removeTag(id: string, tag: string) {
    const { modifiedCount } = await this.editOne(Book, {
      filter: { _id: id },
      mode: EditMode.Pull,
      arrayField: "tags",
      element: tag,
    });

    if (modifiedCount) await this.delCache(`book:${id}`);
  }

  async upvoteBook(id: string, voterId: string) {
    const { modifiedCount } = await this.editOne(Book, {
      filter: { _id: id },
      mode: EditMode.IncPush,
      numberField: "votes",
      arrayField: "voterIds",
      element: voterId,
    });

    if (modifiedCount) await this.delCache(`book:${id}`);
  }

  async downvoteBook(id: string, voterId: string) {
    const { modifiedCount } = await this.editOne(Book, {
      filter: { _id: id },
      mode: EditMode.DecPull,
      numberField: "votes",
      arrayField: "voterIds",
      element: voterId,
    });

    if (modifiedCount) await this.delCache(`book:${id}`);
  }

  async downvoteBooksByVoterId(voterId: string, session?: any) {
    const { modifiedCount } = await this.editMany(
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

    if (modifiedCount) await this.delPrefixCache("book:*");
  }

  async dropBookById(id: string, session?: any) {
    const { deletedCount } = await this.dropOne(Book, { _id: id }, session);
    if (deletedCount) await this.delCache(`book:${id}`);
  }

  async dropBookByTitle(title: string, session?: any) {
    const { deletedCount } = await this.dropOne(Book, { title }, session);

    if (deletedCount) {
      const book = await this.getBookByTitle(title, session);
      if (book) await this.delCache(`book:${book.id}`);
    }
  }

  async dropBooksByAuthorId(authorId: string, session?: any) {
    const { deletedCount } = await this.dropMany(Book, { authorId }, session);
    if (deletedCount) await this.delPrefixCache("book:*");
  }

  async dropBooks(session?: any) {
    const { deletedCount } = await this.dropMany(Book, session);
    if (deletedCount) await this.delPrefixCache("book:*");
  }
}
