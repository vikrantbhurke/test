"use server";
import { EditBookDTO, SaveBookDTO, SaveBookSchema } from "./schema";
import { Genre } from "./enums";
import { bookService } from "..";
import { GetManyDTO } from "@/global/classes";

export const saveBooks = async (file: File) => {
  const text = await file.text();
  const saveBooksDTO: SaveBookDTO[] = JSON.parse(text);
  const result = SaveBookSchema.array().safeParse(saveBooksDTO);

  if (!result.success) {
    console.log("⛔ Validation Result:", result);
    return "Invalid data format. Please ensure the file contains an array of books in the correct format.";
  }

  try {
    await bookService.saveBooks(saveBooksDTO);
    return "Books saved successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const saveBook = async (saveBookDTO: SaveBookDTO) => {
  try {
    await bookService.saveBook(saveBookDTO);
    return "Book saved successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const checkBook = async (title: string) => {
  try {
    return await bookService.checkBook(title);
  } catch (error: any) {
    throw error;
  }
};

export const countBooks = async () => {
  try {
    return await bookService.countBooks();
  } catch (error: any) {
    throw error;
  }
};

export const countBooksByAuthorId = async (authorId: string) => {
  try {
    return await bookService.countBooksByAuthorId(authorId);
  } catch (error: any) {
    throw error;
  }
};

export const getBookById = async (id: string, auth?: any) => {
  try {
    return await bookService.getBookById(id, auth);
  } catch (error: any) {
    throw error;
  }
};

export const getBookByTitle = async (title: string) => {
  try {
    return await bookService.getBookByTitle(title);
  } catch (error: any) {
    throw error;
  }
};

export const getBookByIndex = async (index: number) => {
  try {
    return await bookService.getBookByIndex(index);
  } catch (error: any) {
    throw error;
  }
};

export const getBooks = async (getManyDTO: GetManyDTO, auth?: any) => {
  try {
    return await bookService.getBooks(getManyDTO, auth);
  } catch (error: any) {
    throw error;
  }
};

export const editBookById = async (id: string, editBookDTO: EditBookDTO) => {
  try {
    await bookService.editBookById(id, editBookDTO);
    return "Book edited successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const editBookByTitle = async (
  title: string,
  editBookDTO: EditBookDTO
) => {
  try {
    await bookService.editBookByTitle(title, editBookDTO);
    return "Book edited successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const editBooksByGenre = async (
  genre: Genre,
  editBookDTO: EditBookDTO
) => {
  try {
    await bookService.editBooksByGenre(genre, editBookDTO);
    return "Books edited successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const likeBook = async (id: string) => {
  try {
    await bookService.likeBook(id);
    return "Book liked successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const unlikeBook = async (id: string) => {
  try {
    await bookService.unlikeBook(id);
    return "Book unliked successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const addTag = async (id: string, tag: string) => {
  try {
    await bookService.addTag(id, tag);
    return "Tag added successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const removeTag = async (id: string, tag: string) => {
  try {
    await bookService.removeTag(id, tag);
    return "Tag removed successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const upvoteBook = async (id: string, voterId: string) => {
  try {
    await bookService.upvoteBook(id, voterId);
    return "Book upvoted successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const downvoteBook = async (id: string, voterId: string) => {
  try {
    await bookService.downvoteBook(id, voterId);
    return "Book downvoted successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const dropBookById = async (id: string) => {
  try {
    await bookService.dropBookById(id);
    return "Book deleted successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const dropBookByTitle = async (title: string) => {
  try {
    await bookService.dropBookByTitle(title);
    return "Book deleted successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const dropBooksByAuthorId = async (authorId: string) => {
  try {
    await bookService.dropBooksByAuthorId(authorId);
    return "Books deleted successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const dropBooks = async () => {
  try {
    await bookService.dropBooks();
    return "Books deleted successfully.";
  } catch (error: any) {
    throw error;
  }
};
