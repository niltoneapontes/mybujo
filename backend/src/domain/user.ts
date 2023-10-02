import mongoose from "mongoose";
import { userSchema } from "../infrastructure/database/userSchema";

export interface IUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  birthdate?: string;
  location?: string;
}

export const User = mongoose.model("User", userSchema);
