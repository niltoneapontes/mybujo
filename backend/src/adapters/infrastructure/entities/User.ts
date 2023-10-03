import mongoose from "mongoose";
import { userSchema } from "../database/UserSchema";

export const User = mongoose.model("User", userSchema);
