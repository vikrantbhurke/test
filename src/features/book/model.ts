import { Genre } from "./enums";
import { Schema, model, models } from "mongoose";
const { ObjectId } = Schema.Types;

const BookSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    synopsis: { type: String },
    authorId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    likes: { type: Number, default: 0 },
    tags: [{ type: String, default: [] }],
    votes: { type: Number, default: 0 },
    voterIds: [{ type: ObjectId, ref: "User", default: [] }],
    genre: { type: String, enum: Object.values(Genre), required: true },
  },
  {
    collection: "Book",
    timestamps: true,
  }
);

export const Book = models.Book || model("Book", BookSchema);
