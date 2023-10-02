import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  picture: String,
  birthdate: String,
  location: String,
});
