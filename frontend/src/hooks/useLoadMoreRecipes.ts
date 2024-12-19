import { useState } from "react";

import { fetchRecipes } from "../spoonacular/spoonacularAPI";

import { Alert } from "react-native";

export function useRecipeActions(
  ingredients: string[],

  selectedPreferences: string[],

  servings: number | null,

  setRecipes: (recipes: any[] | ((prev: any[]) => any[])) => void
) {
  const [loading, setLoading] = useState<boolean>(false);

  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const [offset, setOffset] = useState<number>(0);

  const handleSearch = async () => {
    if (ingredients.length === 0) {
      Alert.alert("Invalid Input", "Please enter at least one ingredient.");
      return;
    }
  
    setLoading(true);
    setError(null);
    setOffset(0); 
  
    try {
      const dietaryFilterString = selectedPreferences.join(",");
      const data = await fetchRecipes(
        ingredients.join(","),
        dietaryFilterString,
        0, 
        10
      );
  
      setRecipes(data);
      setOffset(10); 
    } catch (err) {
      console.error("Error during search:", err);
      Alert.alert("Error", "Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  };
  

  const loadMoreRecipes = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
  
    try {
      const dietaryFilters = selectedPreferences.join(",");
  
      const data = await fetchRecipes(
        ingredients.join(","),
        dietaryFilters,
        offset,
        10
      );
    
      if (data.length > 0) {
        setRecipes((prev) => [...prev, ...data]);
        setOffset((prevOffset) => prevOffset + 10); 
      } else {
        console.log("No more recipes found.");
      }
    } catch (err) {
      console.error("Error loading more recipes:", err);
      setError("Failed to load more recipes.");
    } finally {
      setLoadingMore(false);
    }
  };
  
  return { handleSearch, loadMoreRecipes, loading, loadingMore, error };
}
