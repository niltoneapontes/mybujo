import mongoose from "mongoose";
import { collectionSchema } from "../database/CollectionSchema";

export const Collection = mongoose.model("Collection", collectionSchema);
