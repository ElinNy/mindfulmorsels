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
) => {
  const apiKey = SPOONACULAR_API_KEY;
  let url = `https://api.spoonacular.com/recipes/complexSearch?query=${ingredients}&number=${number}&offset=${offset}&apiKey=${apiKey}`;

  if (dietaryFilters) {
    url += `&diet=${dietaryFilters}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return data.results;
};


export const searchRecipes = async (
  query: string,
  diet: string
): Promise<any> => {
  try {
    const response = await apiClient.get("/recipes/complexSearch", {
      params: {
        query,
        number: 10,
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
