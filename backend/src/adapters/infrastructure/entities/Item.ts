import mongoose from "mongoose";
import { itemSchema } from "../database/ItemSchema";

export const Item = mongoose.model("Item", itemSchema);
