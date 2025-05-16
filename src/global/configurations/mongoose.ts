import mongoose from "mongoose";
import { Book } from "@/features/book/model";
import { User } from "@/features/user/model";
import { Comment } from "@/features/comment/model";
import { BookLiker } from "@/features/book-liker/model";

const connectDB = async () => {
  try {
    const mongoDBUri = process.env.MONGODB_URI as string;
    if (!mongoDBUri) throw new Error("MONGODB_URI is not defined");
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(mongoDBUri);
    Book;
    User;
    Comment;
    BookLiker;
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed");
    console.error(error);
    process.exit(1);
  }
};

connectDB();

export default connectDB;
