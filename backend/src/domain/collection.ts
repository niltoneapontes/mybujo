import mongoose from "mongoose";
import { collectionSchema } from "../infrastructure/database/collectionSchema";

export interface ICollection {
  userId: string;
  title: string;
  content: string;
}

export const Collection = mongoose.model("Collection", collectionSchema);
