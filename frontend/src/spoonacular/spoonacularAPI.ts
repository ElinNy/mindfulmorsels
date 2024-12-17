import axios from "axios";
import { SPOONACULAR_BASE_URL, SPOONACULAR_API_KEY } from "./spoonacularConfig";

const apiClient = axios.create({
  baseURL: SPOONACULAR_BASE_URL,
  params: {
    apiKey: SPOONACULAR_API_KEY,
  },
});

export async function fetchRecipes(ingredients: string, dietaryFilters: string, offset: number = 0, number: number = 10) {
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${number}&offset=${offset}&diet=${dietaryFilters}&apiKey=${SPOONACULAR_API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}


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
