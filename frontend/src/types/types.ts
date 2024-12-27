import { Timestamp } from "firebase/firestore";

export interface Bookmark {
  recipeId: number;
  title: string;
  image: string;
  createdAt: Timestamp;
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
}

export interface RecipeDetails extends Recipe {
  servings: number;
  instructions: string;
  extendedIngredients: {
    id: number;
    original: string;
  }[];
}
