import axios from "axios";
import { SPOONACULAR_BASE_URL, SPOONACULAR_API_KEY } from "./spoonacularConfig";

const apiClient = axios.create({
  baseURL: SPOONACULAR_BASE_URL,
  params: {
    apiKey: SPOONACULAR_API_KEY,
  },
});

export const fetchRecipes = async (query: string): Promise<any> => {
    try {
      const recipes = await searchRecipes(query);
      return recipes;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      throw error;
    }
  };
  
export const searchRecipes = async (query: string): Promise<any> => {
  try {
    const response = await apiClient.get("/recipes/complexSearch", {
      params: {
        query,
        number: 10,
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
