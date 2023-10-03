import mongoose from "mongoose";
import { collectionSchema } from "../database/collectionSchema";

export const Collection = mongoose.model("Collection", collectionSchema);
