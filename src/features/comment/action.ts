"use server";
import * as repo from "./repository";
import { SaveCommentDTO } from "./schema";
import { GetManyDTO } from "@/global/utilities";

export async function saveComment(saveCommentDTO: SaveCommentDTO) {
  try {
    await repo.saveComment(saveCommentDTO);
    return { status: "success", message: "Comment created successfully." };
  } catch (error: any) {
    throw error;
  }
}

export async function countComments(filter: any) {
  try {
    return await repo.countComments(filter);
  } catch (error: any) {
    throw error;
  }
}

export async function getComments(getManyDTO: GetManyDTO) {
  try {
    return await repo.getComments(getManyDTO);
  } catch (error: any) {
    throw error;
  }
}

export async function dropCommentById(id: string) {
  try {
    await repo.dropCommentById(id);
    return { status: "success", message: "Comment deleted successfully." };
  } catch (error: any) {
    throw error;
  }
}

export async function dropCommentsByBookId(bookId: string, session?: any) {
  try {
    await repo.dropCommentsByBookId(bookId, session);
    return { status: "success", message: "Comment deleted successfully." };
  } catch (error: any) {
    throw error;
  }
}

export async function dropCommentsByCommenterId(
  commenterId: string,
  session?: any
) {
  try {
    await repo.dropCommentsByCommenterId(commenterId, session);
    return { status: "success", message: "Comment deleted successfully." };
  } catch (error: any) {
    throw error;
  }
}

export async function dropComments(session?: any) {
  try {
    await repo.dropComments(session);
    return { status: "success", message: "Comments deleted successfully." };
  } catch (error: any) {
    throw error;
  }
}
