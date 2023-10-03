import mongoose from "mongoose";
import { userSchema } from "../database/userSchema";

export const User = mongoose.model("User", userSchema);
