import { z } from "zod";
import { Genre } from "./enums";

export const BookSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  synopsis: z.string().optional(),
  authorId: z.string(),
  likes: z.number().optional(),
  votes: z.number().optional(),
  voterIds: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  genre: z.enum(Genre, {
    message: "Genre is required.",
  }),
});

export const SaveBookSchema = BookSchema.omit({
  likes: true,
  votes: true,
  voterIds: true,
  tags: true,
});

export const EditBookSchema = BookSchema.pick({
  title: true,
  synopsis: true,
  genre: true,
}).partial();

export const GetBookSchema = BookSchema.extend({
  id: z.string(),
});

export type BookDTO = z.infer<typeof BookSchema>;
export type SaveBookDTO = z.infer<typeof SaveBookSchema>;
export type EditBookDTO = z.infer<typeof EditBookSchema>;
export type GetBookDTO = z.infer<typeof GetBookSchema>;
