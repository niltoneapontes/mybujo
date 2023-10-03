import mongoose from "mongoose";

export const itemSchema = new mongoose.Schema({
  userId: String,
  date: String,
  content: String,
  type: String,
});
