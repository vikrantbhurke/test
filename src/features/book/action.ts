"use server";
import * as repo from "./repository";
import * as user from "../user/action";
import * as comment from "../comment/action";
import * as bookLiker from "../book-liker/action";
import * as fun from "@/global/utilities";
import { Genre } from "./enums";
import { Type } from "@/global/enums";
import { Clearance } from "../user/enums";
import { GetManyDTO } from "@/global/utilities";
import { EditBookDTO, SaveBookDTO, SaveBookSchema } from "./schema";

export async function saveBooks(file: File) {
  const text = await file.text();
  const saveBooksDTO: SaveBookDTO[] = JSON.parse(text);
  const result = SaveBookSchema.array().safeParse(saveBooksDTO);

  if (!result.success) {
    console.log("⛔ Validation Result:", result);
    return "Invalid data format. Please ensure the file contains an array of books in the correct format.";
  }

  try {
    for (const saveBookDTO of saveBooksDTO) await saveBook(saveBookDTO);
    return "Books saved successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function saveBook(saveBookDTO: SaveBookDTO) {
  try {
    const { title } = saveBookDTO;
    const book = await getBookByTitle(title);
    if (book) throw new Error(`Book with title ${title} already exists.`);
    await repo.saveBook(saveBookDTO);
    return "Book saved successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function checkBook(title: string) {
  try {
    return await repo.checkBook(title);
  } catch (error: any) {
    throw error;
  }
}

export async function countBooks() {
  try {
    return await repo.countBooks();
  } catch (error: any) {
    throw error;
  }
}

export async function countBooksByAuthorId(authorId: string) {
  try {
    return await repo.countBooksByAuthorId(authorId);
  } catch (error: any) {
    throw error;
  }
}

export async function getBookById(id: string, auth?: any) {
  try {
    let book = await repo.getBookById(id);

    if (auth && Clearance.LevelTwo.includes(auth.role)) {
      const exists = await bookLiker.checkBookLiker({
        bookId: book.id,
        likerId: auth.id,
      });

      book = { ...book, like: exists };
    }

    if (!book) throw new Error(`Book not found.`);
    return book;
  } catch (error: any) {
    throw error;
  }
}

export async function getBookByTitle(title: string, session?: any) {
  try {
    return await repo.getBookByTitle(title, session);
  } catch (error: any) {
    throw error;
  }
}

export async function getBookByIndex(index: number) {
  try {
    return await repo.getBookByIndex(index);
  } catch (error: any) {
    throw error;
  }
}

export async function getBooks(getManyDTO: GetManyDTO, auth?: any) {
  try {
    const booksPage = await repo.getBooks(getManyDTO);

    if (!booksPage.content) return booksPage;

    if (auth && Clearance.LevelTwo.includes(auth.role)) {
      const existsArray = await bookLiker.checkBookLikers(
        booksPage.content.map((book: any) => ({
          bookId: book.id,
          likerId: auth.id,
        }))
      );

      return {
        ...booksPage,
        content: booksPage.content.map((book: any, index: number) => ({
          ...book,
          like: existsArray[index],
        })),
      };
    }

    return booksPage;
  } catch (error: any) {
    throw error;
  }
}

export async function editBookById(id: string, editBookDTO: EditBookDTO) {
  try {
    await repo.editBookById(id, editBookDTO);
    return "Book edited successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function editBookByTitle(title: string, editBookDTO: EditBookDTO) {
  try {
    await repo.editBookByTitle(title, editBookDTO);
    return "Book edited successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function editBooksByGenre(genre: Genre, editBookDTO: EditBookDTO) {
  try {
    await repo.editBooksByGenre(genre, editBookDTO);
    return "Books edited successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function likeBook(id: string, session?: any) {
  try {
    await repo.likeBook(id, session);
    return "Book liked successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function unlikeBook(id: string, session?: any) {
  try {
    await repo.unlikeBook(id, session);
    return "Book unliked successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function addTag(id: string, tag: string) {
  try {
    await repo.addTag(id, tag);
    return "Tag added successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function removeTag(id: string, tag: string) {
  try {
    await repo.removeTag(id, tag);
    return "Tag removed successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function upvoteBook(id: string, voterId: string) {
  try {
    await repo.upvoteBook(id, voterId);
    return "Book upvoted successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function downvoteBook(id: string, voterId: string) {
  try {
    await repo.downvoteBook(id, voterId);
    return "Book downvoted successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function downvoteBooksByVoterId(voterId: string, session?: any) {
  try {
    await repo.downvoteBooksByVoterId(voterId, session);
    return "Book downvoted successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function dropBookById(id: string) {
  try {
    await fun.runAtomic(async (session) => {
      await repo.dropBookById(id, session);
      await comment.dropCommentsByBookId(id, session);
      await user.unsetFavBookIdByFavBookId(id, session);
      await bookLiker.dropBookLikersByBookId(id, session);
    });

    return "Book deleted successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function dropBookByTitle(title: string) {
  try {
    await fun.runAtomic(async (session) => {
      const book = await getBookByTitle(title, session);
      if (!book) return;
      await repo.dropBookByTitle(title, session);
      await comment.dropCommentsByBookId(book.id, session);
      await user.unsetFavBookIdByFavBookId(book.id, session);
      await bookLiker.dropBookLikersByBookId(book.id, session);
    });

    return "Book deleted successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function dropBooksByAuthorId(authorId: string, session?: any) {
  try {
    const booksPage = await getBooks(
      { filter: { authorId }, select: "_id", populate: [], type: Type.All },
      session
    );

    if (!booksPage.content) return;
    await repo.dropBooksByAuthorId(authorId, session);

    for (const book of booksPage.content) {
      await comment.dropCommentsByBookId(book.id, session);
      await user.unsetFavBookIdByFavBookId(book.id, session);
      await bookLiker.dropBookLikersByBookId(book.id, session);
    }

    return "Books deleted successfully.";
  } catch (error: any) {
    throw error;
  }
}

export async function dropBooks() {
  try {
    await fun.runAtomic(async (session) => {
      await repo.dropBooks(session);
      await comment.dropComments(session);
      await bookLiker.dropBookLikers(session);
      await user.unsetFavBookIdFromAll(session);
    });

    return "Books deleted successfully.";
  } catch (error: any) {
    throw error;
  }
}
