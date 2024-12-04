import { Timestamp } from "firebase/firestore";

export interface Bookmark {
  recipeId: number;
  title: string;
  image: string;
  createdAt: Timestamp;
}
