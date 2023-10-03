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
