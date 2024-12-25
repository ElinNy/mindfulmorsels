import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRecipes } from "../spoonacular/spoonacularAPI";
import { Recipe } from "../types/types";

interface UseRecipesResult {
  recipes: Recipe[];
  isLoading: boolean;
  error: unknown;
  handleSearch: () => void;
  loadMoreRecipes: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function useRecipes(
  ingredients: string[],
  selectedPreferences: string[],
  servings: number | null
): UseRecipesResult {
  const dietaryFilters = selectedPreferences.join(",");
  const queryKey = ["recipes", ingredients.join(","), dietaryFilters, servings];

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    error,
  } = useInfiniteQuery<Recipe[], Error>({
    queryKey,
    queryFn: ({ pageParam }) => {
      const currentPage = pageParam as number; 
      return fetchRecipes(ingredients.join(","), dietaryFilters, currentPage, 10);
    },
    enabled: false, 
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length * 10 : undefined,
  });

  const recipes = data?.pages ? data.pages.flat() : [];

  const handleSearch = () => {
    if (ingredients.length === 0) {
      alert("Please add at least one ingredient.");
      return;
    }
    refetch();
  };

  const loadMoreRecipes = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return {
    recipes,
    isLoading,
    error,
    handleSearch,
    loadMoreRecipes,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
  };
}
