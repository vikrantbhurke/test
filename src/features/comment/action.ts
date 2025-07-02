"use server";
import { commentService } from "../di";
import { GetManyDTO } from "@/global/classes";
import { SaveCommentDTO, EditCommentDTO } from "./schema";

export const saveComment = async (saveCommentDTO: SaveCommentDTO) => {
  try {
    await commentService.saveComment(saveCommentDTO);
    return "Comment created successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const editCommentById = async (
  id: string,
  editCommentDTO: EditCommentDTO
) => {
  try {
    await commentService.editCommentById(id, editCommentDTO);
    return "Comment updated successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const countComments = async (filter: any) => {
  try {
    return await commentService.countComments(filter);
  } catch (error: any) {
    throw error;
  }
};

export const getComments = async (getManyDTO: GetManyDTO) => {
  try {
    return await commentService.getComments(getManyDTO);
  } catch (error: any) {
    throw error;
  }
};

export const dropCommentById = async (id: string) => {
  try {
    await commentService.dropCommentById(id);
    return "Comment deleted successfully.";
  } catch (error: any) {
    throw error;
  }
};

export const dropCommentsByBookId = async (bookId: string) => {
  try {
    await commentService.dropCommentsByBookId(bookId);
    return "Comments deleted successfully.";
  } catch (error: any) {
    throw error;
  }
};
