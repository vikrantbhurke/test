import { z } from "zod";

export const BookLikerSchema = z.object({
  bookId: z.string(),
  likerId: z.string(),
});

export type BookLikerDTO = z.infer<typeof BookLikerSchema>;
