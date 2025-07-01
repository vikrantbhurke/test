import { Schema, model, models } from "mongoose";
const { ObjectId } = Schema.Types;

const BookLikerSchema = new Schema(
  {
    bookId: { type: ObjectId, ref: "Book", required: true },
    likerId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "BookLiker", timestamps: true }
);

export const BookLiker =
  models.BookLiker || model("BookLiker", BookLikerSchema);
