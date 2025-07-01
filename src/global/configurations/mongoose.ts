"use server";
import mongoose from "mongoose";
import { Book } from "@/features/book/model";
import { User } from "@/features/user/model";
import { Comment } from "@/features/comment/model";
import { BookLiker } from "@/features/book-liker/model";

let connection: typeof mongoose | null = null;

const connectMongoose = async () => {
  if (connection) return connection;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined");

  if (mongoose.connection.readyState >= 1) {
    connection = mongoose;
    return connection;
  }

  connection = await mongoose.connect(uri);
  [Book, User, Comment, BookLiker]; // Ensure models are registered
  console.log("✅ Mongoose connected");
  return connection;
};

export default connectMongoose;
