"use server";
import {
  EditBookDTO,
  SaveBookDTO,
  EditBookSchema,
  SaveBookSchema,
} from "./schema";
import { Genre } from "./enums";
import { bookService } from "..";
import { GetManyDTO, Exception } from "@/global/classes";

export const saveBooks = async (file: File) => {
  const text = await file.text();
  const saveBooksDTO: SaveBookDTO[] = JSON.parse(text);
  const result = SaveBookSchema.array().safeParse(saveBooksDTO);
  if (!result.success) return Exception.getZodError(result);

  try {
    await bookService.saveBooks(result.data);
    return { success: true, message: "Books saved successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const saveBook = async (saveBookDTO: SaveBookDTO) => {
  const result = SaveBookSchema.safeParse(saveBookDTO);
  if (!result.success) return Exception.getZodError(result);

  try {
    await bookService.saveBook(result.data);
    return { success: true, message: "Book saved successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const checkBook = async (title: string) => {
  try {
    const exists = await bookService.checkBook(title);
    return { success: true, exists };
  } catch (error: any) {
    throw error;
  }
};

export const countBooks = async () => {
  try {
    const count = await bookService.countBooks();
    return { success: true, count };
  } catch (error: any) {
    throw error;
  }
};

export const countBooksByAuthorId = async (authorId: string) => {
  try {
    const count = await bookService.countBooksByAuthorId(authorId);
    return { success: true, count };
  } catch (error: any) {
    throw error;
  }
};

export const getBookById = async (id: string) => {
  try {
    const book = await bookService.getBookById(id);
    return { success: true, data: book };
  } catch (error: any) {
    throw error;
  }
};

export const getBookByTitle = async (title: string) => {
  try {
    const book = await bookService.getBookByTitle(title);
    return { success: true, data: book };
  } catch (error: any) {
    throw error;
  }
};

export const getBookByIndex = async (index: number) => {
  try {
    const book = await bookService.getBookByIndex(index);
    return { success: true, data: book };
  } catch (error: any) {
    throw error;
  }
};

export const searchBooks = async (getManyDTO: GetManyDTO) => {
  try {
    const booksPage = await bookService.searchBooks(getManyDTO);
    return { success: true, data: booksPage };
  } catch (error: any) {
    throw error;
  }
};

export const getBooks = async (getManyDTO: GetManyDTO) => {
  try {
    const booksPage = await bookService.getBooks(getManyDTO);
    return { success: true, data: booksPage };
  } catch (error: any) {
    throw error;
  }
};

export const getRandomBooks = async (getManyDTO: GetManyDTO) => {
  try {
    const booksPage = await bookService.getRandomBooks(getManyDTO);
    return { success: true, data: booksPage };
  } catch (error: any) {
    throw error;
  }
};

export const editBookById = async (id: string, editBookDTO: EditBookDTO) => {
  const result = EditBookSchema.safeParse(editBookDTO);
  if (!result.success) return Exception.getZodError(result);

  try {
    await bookService.editBookById(id, result.data);
    return { success: true, message: "Book edited successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const editBookByTitle = async (
  title: string,
  editBookDTO: EditBookDTO
) => {
  const result = EditBookSchema.safeParse(editBookDTO);
  if (!result.success) return Exception.getZodError(result);

  try {
    await bookService.editBookByTitle(title, result.data);
    return { success: true, message: "Book edited successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const editBooksByGenre = async (
  genre: Genre,
  editBookDTO: EditBookDTO
) => {
  const result = EditBookSchema.safeParse(editBookDTO);
  if (!result.success) return Exception.getZodError(result);

  try {
    await bookService.editBooksByGenre(genre, result.data);
    return { success: true, message: "Books edited successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const likeBook = async (id: string) => {
  try {
    await bookService.likeBook(id);
    return { success: true, message: "Book liked successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const unlikeBook = async (id: string) => {
  try {
    await bookService.unlikeBook(id);
    return { success: true, message: "Book unliked successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const addTag = async (id: string, tag: string) => {
  try {
    await bookService.addTag(id, tag);
    return { success: true, message: "Tag added successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const removeTag = async (id: string, tag: string) => {
  try {
    await bookService.removeTag(id, tag);
    return { success: true, message: "Tag removed successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const upvoteBook = async (id: string, voterId: string) => {
  try {
    await bookService.upvoteBook(id, voterId);
    return { success: true, message: "Book upvoted successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const downvoteBook = async (id: string, voterId: string) => {
  try {
    await bookService.downvoteBook(id, voterId);
    return { success: true, message: "Book downvoted successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const dropBookById = async (id: string) => {
  try {
    await bookService.dropBookById(id);
    return { success: true, message: "Book deleted successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const dropBookByTitle = async (title: string) => {
  try {
    await bookService.dropBookByTitle(title);
    return { success: true, message: "Book deleted successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const dropBooksByAuthorId = async (authorId: string) => {
  try {
    await bookService.dropBooksByAuthorId(authorId);
    return { success: true, message: "Books deleted successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const dropBooks = async () => {
  try {
    await bookService.dropBooks();
    return { success: true, message: "Books deleted successfully." };
  } catch (error: any) {
    throw error;
  }
};
