import axios from "axios";
import { SPOONACULAR_BASE_URL, SPOONACULAR_API_KEY } from "./spoonacularConfig";

const apiClient = axios.create({
  baseURL: SPOONACULAR_BASE_URL,
  params: {
    apiKey: SPOONACULAR_API_KEY,
  },
});

export const fetchRecipes = async (query: string, diet: string): Promise<any> => {
  try {
    console.log("Fetching recipes with query:", query, "and diet:", diet);
    const recipes = await searchRecipes(query, diet);
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const searchRecipes = async (query: string, diet: string): Promise<any> => {
  try {
    const response = await apiClient.get("/recipes/complexSearch", {
      params: {
        query,
        number: 5,
        diet,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw error;
  }
};

export const getRecipeDetails = async (recipeId: number): Promise<any> => {
  try {
    const response = await apiClient.get(`/recipes/${recipeId}/information`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    throw error;
  }
};
