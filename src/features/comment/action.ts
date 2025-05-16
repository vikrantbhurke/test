"use server";
import {
  SaveCommentDTO,
  EditCommentDTO,
  SaveCommentSchema,
  EditCommentSchema,
} from "./schema";
import { commentService } from "..";
import { GetManyDTO, Exception } from "@/global/classes";

export const saveComment = async (saveCommentDTO: SaveCommentDTO) => {
  const result = SaveCommentSchema.safeParse(saveCommentDTO);
  if (!result.success) return Exception.getZodError(result);

  try {
    await commentService.saveComment(result.data);
    return { success: true, message: "Comment created successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const editCommentById = async (
  id: string,
  editCommentDTO: EditCommentDTO
) => {
  const result = EditCommentSchema.safeParse(editCommentDTO);
  if (!result.success) return Exception.getZodError(result);

  try {
    await commentService.editCommentById(id, result.data);
    return { success: true, message: "Comment updated successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const getComments = async (getManyDTO: GetManyDTO) => {
  try {
    const commentsPage = await commentService.getComments(getManyDTO);
    return {
      success: true,
      data: commentsPage,
    };
  } catch (error: any) {
    throw error;
  }
};

export const dropCommentById = async (id: string) => {
  try {
    await commentService.dropCommentById(id);
    return { success: true, message: "Comment deleted successfully." };
  } catch (error: any) {
    throw error;
  }
};

export const dropCommentsByBookId = async (bookId: string) => {
  try {
    await commentService.dropCommentsByBookId(bookId);
    return { success: true, message: "Comments deleted successfully." };
  } catch (error: any) {
    throw error;
  }
};
