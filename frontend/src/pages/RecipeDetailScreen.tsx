import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { getRecipeDetails } from "../spoonacular/spoonacularAPI";
import { styles } from "./styles/RecipeDetailScreenStyle";
import BookmarkIcon from "../components/bookmark/BookmarkIcon";
import { useBookmarks } from "../hooks/useBookmarks";

export default function RecipeDetailsScreen({ route }: any) {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { bookmarkedRecipes, toggleBookmark } = useBookmarks();

  const isBookmarked = bookmarkedRecipes.some(
    (bookmark) => bookmark.recipeId === recipeId
  );

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getRecipeDetails(recipeId);
        setRecipe(details);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        Alert.alert("Fel", "Kunde inte hämta receptdetaljer.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [recipeId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6F61" />
        <Text style={styles.loadingText}>Laddar receptdetaljer...</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Kunde inte ladda receptdetaljer.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.header}>
        <Text style={styles.title}>{recipe.title}</Text>
        <BookmarkIcon
          isBookmarked={isBookmarked}
          onPress={() =>
            toggleBookmark({
              id: recipeId,
              title: recipe.title,
              image: recipe.image,
            })
          }
        />
      </View>
      <Text style={styles.sectionPortions}>Servings: {recipe.servings}</Text>
      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {recipe.extendedIngredients.map((ingredient: any) => (
        <Text key={ingredient.id} style={styles.text}>
          - {ingredient.original}
        </Text>
      ))}
      <Text style={styles.sectionTitle}>Instructions:</Text>
      <Text style={styles.text}>
        {recipe.instructions || "Inga instruktioner tillgängliga."}
      </Text>
    </ScrollView>
  );
}