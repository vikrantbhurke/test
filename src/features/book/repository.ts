import { Book } from "./model";
import { Genre } from "./enums";
import { EditBookDTO, SaveBookDTO } from "./schema";
import { Repository, GetManyDTO } from "@/global/classes";

const select = "title synopsis authorId likes votes voterIds tags genre";
const populate = ["authorId"];
const populateSelect = ["firstname lastname username avatar"];
const searchFields = ["title", "synopsis"];

export class BookRepository extends Repository {
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
    return await this.getOne(Book, {
      conditions: { _id: id },
      select,
      populate,
      populateSelect,
    });
  }

  async getBookByTitle(title: string, session?: any) {
    return await this.getOne(
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

  async getBookByIndex(index: number) {
    return await this.getOne(Book, {
      index,
      select,
      populate,
      populateSelect,
    });
  }

  async getAllBookIdsByAuthorId(authorId: string, session?: any) {
    return await this.getMany(
      Book,
      {
        filter: { authorId },
        select: "_id",
        type: "all",
      },
      session
    );
  }

  async getBooks(getManyDTO: GetManyDTO) {
    return await this.getMany(Book, {
      ...getManyDTO,
      select,
      populate,
      populateSelect,
      searchFields,
    });
  }

  async getRandomBooks(getManyDTO: GetManyDTO) {
    return await this.getMany(Book, {
      ...getManyDTO,
      select,
      populate,
      populateSelect,
      type: "random",
    });
  }

  async editBookById(id: string, editBookDTO: EditBookDTO) {
    await this.editOne(Book, {
      filter: { _id: id },
      mode: "set",
      update: editBookDTO,
    });
  }

  async editBookByTitle(title: string, editBookDTO: EditBookDTO) {
    await this.editOne(Book, {
      filter: { title },
      mode: "set",
      update: editBookDTO,
    });
  }

  async editBooksByGenre(genre: Genre, editBookDTO: EditBookDTO) {
    await this.editMany(Book, {
      filter: { genre },
      mode: "set",
      update: editBookDTO,
    });
  }

  async likeBook(id: string, session?: any) {
    await this.editOne(
      Book,
      {
        filter: { _id: id },
        mode: "inc",
        numberField: "likes",
      },
      session
    );
  }

  async unlikeBook(id: string, session?: any) {
    await this.editOne(
      Book,
      {
        filter: { _id: id },
        mode: "dec",
        numberField: "likes",
      },
      session
    );
  }

  async addTag(id: string, tag: string) {
    await this.editOne(Book, {
      filter: { _id: id },
      mode: "push",
      arrayField: "tags",
      element: tag,
    });
  }

  async removeTag(id: string, tag: string) {
    await this.editOne(Book, {
      filter: { _id: id },
      mode: "pull",
      arrayField: "tags",
      element: tag,
    });
  }

  async upvoteBook(id: string, voterId: string) {
    await this.editOne(Book, {
      filter: { _id: id },
      mode: "inc-push",
      numberField: "votes",
      arrayField: "voterIds",
      element: voterId,
    });
  }

  async downvoteBook(id: string, voterId: string) {
    await this.editOne(Book, {
      filter: { _id: id },
      mode: "dec-pull",
      numberField: "votes",
      arrayField: "voterIds",
      element: voterId,
    });
  }

  async downvoteBooksByVoterId(voterId: string, session?: any) {
    await this.editMany(
      Book,
      {
        filter: { voterIds: voterId },
        mode: "dec-pull",
        numberField: "votes",
        arrayField: "voterIds",
        element: voterId,
      },
      session
    );
  }

  async dropBookById(id: string, session?: any) {
    await this.dropOne(Book, { _id: id }, session);
  }

  async dropBookByTitle(title: string, session?: any) {
    await this.dropOne(Book, { title }, session);
  }

  async dropBooksByAuthorId(authorId: string, session?: any) {
    await this.dropMany(Book, { authorId }, session);
  }

  async dropBooks(session?: any) {
    await this.dropMany(Book, session);
  }
}
