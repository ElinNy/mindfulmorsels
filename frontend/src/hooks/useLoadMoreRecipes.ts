import { useState } from "react";
import { fetchRecipes } from "../spoonacular/spoonacularAPI";

export function useRecipeActions(
  ingredients: string[],
  selectedPreferences: string[],
  setRecipes: (recipes: any[] | ((prev: any[]) => any[])) => void
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);

  const handleSearch = async () => {
    if (ingredients.length === 0) {
      setError("Please add at least one ingredient.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dietaryFilters = selectedPreferences.join(",");
      const data = await fetchRecipes(ingredients.join(","), dietaryFilters, 0, 10);
      setRecipes(data);
      setOffset(10);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreRecipes = async () => {
    if (loadingMore) return;
    setLoadingMore(true);

    try {
      const dietaryFilters = selectedPreferences.join(",");
      const data = await fetchRecipes(ingredients.join(","), dietaryFilters, offset, 10);

      if (data.length > 0) {
        setRecipes((prev) => [...prev, ...data]);
        setOffset(offset + 10);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load more recipes.");
    } finally {
      setLoadingMore(false);
    }
  };

  return { handleSearch, loadMoreRecipes, loading, loadingMore, error };
}
