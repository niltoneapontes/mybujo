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

export function getEnumFromValue(value: string) {
  const response: ItemType = ItemType[value as keyof typeof ItemType];
  return response;
}
