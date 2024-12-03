import { Alert } from "react-native";
import { shareRecipe } from "../utils/firebaseUtils";

export function useShareRecipe() {
  const handleShareRecipe = async (recipe: any) => {
    try {
      if (!recipe || !recipe.recipeId || !recipe.title || !recipe.image) {
        throw new Error("Incomplete recipe data. Cannot share.");
      }

      await shareRecipe({
        recipeId: recipe.recipeId,
        title: recipe.title,
        image: recipe.image,
      });

      Alert.alert("Success", `${recipe.title} has been shared successfully!`);
    } catch (error) {
      console.error("Error sharing recipe:", error);
      Alert.alert("Error", "Failed to share the recipe. Please try again.");
    }
  };

  return { handleShareRecipe };
}
