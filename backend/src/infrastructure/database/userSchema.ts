import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  name: String,
  picture: String,
  birthdate: String,
  location: String,
});
