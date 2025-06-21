import { Book } from "./model";
import { Genre } from "./enums";
import { EditBookDTO, SaveBookDTO } from "./schema";
import { Repository, GetManyDTO } from "@/global/classes";
import redis from "@/global/configurations/redis";

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
    const keys = await redis.keys("*");
    console.log("getBookById Cache keys:", keys);

    const key = `book:${id}`;
    const cachedBook = await redis.get(key);
    if (cachedBook) {
      console.log("CACHE HIT:", id);
      return JSON.parse(cachedBook);
    }

    const dbBook = await this.getOne(Book, {
      conditions: { _id: id },
      select,
      populate,
      populateSelect,
    });

    if (dbBook) {
      console.log("CACHE MISS:", id);
      await redis.set(key, JSON.stringify(dbBook), "EX", 86400);
    }
    return dbBook;
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
    await redis.flushall();
    const keys = await redis.keys("*");
    console.log("getBooks Cache keys:", keys);

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
    const { modifiedCount } = await this.editOne(Book, {
      filter: { _id: id },
      mode: "set",
      update: editBookDTO,
    });

    if (modifiedCount) await redis.del(`book:${id}`);
  }

  async editBookByTitle(title: string, editBookDTO: EditBookDTO) {
    const { modifiedCount } = await this.editOne(Book, {
      filter: { title },
      mode: "set",
      update: editBookDTO,
    });

    if (modifiedCount) {
      const book = await this.getBookByTitle(title);
      if (book) await redis.del(`book:${book.id}`);
    }
  }

  async editBooksByGenre(genre: Genre, editBookDTO: EditBookDTO) {
    const { modifiedCount } = await this.editMany(Book, {
      filter: { genre },
      mode: "set",
      update: editBookDTO,
    });

    if (modifiedCount) {
      const stream = redis.scanStream({ match: "book:*", count: 100 });
      stream.on("data", (keys: string[]) => keys.length && redis.del(...keys));
    }
  }

  async likeBook(id: string, session?: any) {
    const { modifiedCount } = await this.editOne(
      Book,
      {
        filter: { _id: id },
        mode: "inc",
        numberField: "likes",
      },
      session
    );

    if (modifiedCount) await redis.del(`book:${id}`);
  }

  async unlikeBook(id: string, session?: any) {
    const { modifiedCount } = await this.editOne(
      Book,
      {
        filter: { _id: id },
        mode: "dec",
        numberField: "likes",
      },
      session
    );

    if (modifiedCount) await redis.del(`book:${id}`);
  }

  async addTag(id: string, tag: string) {
    const { modifiedCount } = await this.editOne(Book, {
      filter: { _id: id },
      mode: "push",
      arrayField: "tags",
      element: tag,
    });

    if (modifiedCount) await redis.del(`book:${id}`);
  }

  async removeTag(id: string, tag: string) {
    const { modifiedCount } = await this.editOne(Book, {
      filter: { _id: id },
      mode: "pull",
      arrayField: "tags",
      element: tag,
    });

    if (modifiedCount) await redis.del(`book:${id}`);
  }

  async upvoteBook(id: string, voterId: string) {
    const { modifiedCount } = await this.editOne(Book, {
      filter: { _id: id },
      mode: "inc-push",
      numberField: "votes",
      arrayField: "voterIds",
      element: voterId,
    });

    if (modifiedCount) await redis.del(`book:${id}`);
  }

  async downvoteBook(id: string, voterId: string) {
    const { modifiedCount } = await this.editOne(Book, {
      filter: { _id: id },
      mode: "dec-pull",
      numberField: "votes",
      arrayField: "voterIds",
      element: voterId,
    });

    if (modifiedCount) await redis.del(`book:${id}`);
  }

  async downvoteBooksByVoterId(voterId: string, session?: any) {
    const { modifiedCount } = await this.editMany(
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

    if (modifiedCount) {
      const stream = redis.scanStream({ match: "book:*", count: 100 });
      stream.on("data", (keys: string[]) => keys.length && redis.del(...keys));
    }
  }

  async dropBookById(id: string, session?: any) {
    const { deletedCount } = await this.dropOne(Book, { _id: id }, session);
    if (deletedCount) await redis.del(`book:${id}`);
  }

  async dropBookByTitle(title: string, session?: any) {
    const { deletedCount } = await this.dropOne(Book, { title }, session);

    if (deletedCount) {
      const book = await this.getBookByTitle(title, session);
      if (book) await redis.del(`book:${book.id}`);
    }
  }

  async dropBooksByAuthorId(authorId: string, session?: any) {
    const { deletedCount } = await this.dropMany(Book, { authorId }, session);

    if (deletedCount) {
      const stream = redis.scanStream({ match: "book:*", count: 100 });
      stream.on("data", (keys: string[]) => keys.length && redis.del(...keys));
    }
  }

  async dropBooks(session?: any) {
    const { deletedCount } = await this.dropMany(Book, session);

    if (deletedCount) {
      const stream = redis.scanStream({ match: "book:*", count: 100 });
      stream.on("data", (keys: string[]) => keys.length && redis.del(...keys));
    }
  }
}
