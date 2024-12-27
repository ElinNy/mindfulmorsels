import axios from "axios";
import { SPOONACULAR_BASE_URL, SPOONACULAR_API_KEY } from "./spoonacularConfig";

const apiClient = axios.create({
  baseURL: SPOONACULAR_BASE_URL,
  params: {
    apiKey: SPOONACULAR_API_KEY,
  },
});

export const fetchRecipes = async (
  ingredients: string,
  dietaryFilters: string,
  offset: number,
  number: number
): Promise<any[]> => {
  try {
    const params: any = {
      query: ingredients,
      number,
      offset,
    };

    if (dietaryFilters) {
      params.diet = dietaryFilters;
    }

    const response = await apiClient.get("/recipes/complexSearch", { params });

    if (response.data && response.data.results) {
      return response.data.results;
    }

    console.error("No results found.");
    return [];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw new Error("Failed to fetch recipes. Please try again later.");
  }
};



export const getRecipeDetails = async (recipeId: number): Promise<any> => {
  const response = await apiClient.get(`/recipes/${recipeId}/information`);
  return response.data;
};
