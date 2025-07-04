import { z } from "zod";

export const CommentSchema = z.object({
  body: z.string().min(1, { message: "Comment body is required." }),
  bookId: z.string(),
  commenterId: z.string(),
});

export const SaveCommentSchema = CommentSchema;

export type SaveCommentDTO = z.infer<typeof SaveCommentSchema>;
