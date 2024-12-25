import { useQuery } from "@tanstack/react-query";
import { getRecipeDetails } from "../spoonacular/spoonacularAPI";
import { RecipeDetails } from "../types/types";

export const useRecipeDetails = (recipeId: number) => {
  return useQuery<RecipeDetails>({
    queryKey: ["recipeDetails", recipeId],
    queryFn: () => getRecipeDetails(recipeId),
    enabled: !!recipeId,
  });
};
