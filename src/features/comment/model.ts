import { Schema, model, models } from "mongoose";
const { ObjectId } = Schema.Types;

const CommentSchema = new Schema(
  {
    body: { type: String, required: true },
    bookId: { type: ObjectId, ref: "Book", required: true },
    commenterId: { type: ObjectId, ref: "User", required: true },
  },
  {
    collection: "Comment",
    timestamps: true,
  }
);

export const Comment = models.Comment || model("Comment", CommentSchema);
