import mongoose from "mongoose";
import { itemSchema } from "../database/itemSchema";

export const Item = mongoose.model("Item", itemSchema);
