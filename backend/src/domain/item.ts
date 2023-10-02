import mongoose from "mongoose";
import { itemSchema } from "../infrastructure/database/itemSchema";

export enum ItemType {
  Daily = "daily",
  Monthly = "monthly",
  Future = "future",
}

export interface IItem {
  userId: string;
  date: string;
  content: string;
  type: ItemType;
}

export const Item = mongoose.model("Item", itemSchema);
