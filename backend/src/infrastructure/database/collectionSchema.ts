import mongoose from "mongoose";

export const collectionSchema = new mongoose.Schema({
  userId: String,
  title: String,
  content: String,
});
