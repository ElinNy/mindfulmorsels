import React from "react";
import { View, Text, Image, ActivityIndicator, ScrollView, Alert } from "react-native";
import { useRecipeDetails } from "../hooks/useRecipesDetails";
import { styles } from "./styles/RecipeDetailScreenStyle";
import BookmarkIcon from "../components/bookmark/BookmarkIcon";
import { useBookmarks } from "../context/BookmarkContext";
import BackButton from "../components/backButton/BackButton";

export default function RecipeDetailsScreen({ route }: any) {
  const { recipeId } = route.params;
  const { data: recipe, isLoading, error } = useRecipeDetails(recipeId);
  const { bookmarkedRecipes, toggleBookmark } = useBookmarks();

  const isBookmarked = bookmarkedRecipes.some(
    (bookmark) => String(bookmark.recipeId) === String(recipeId)
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6F61" />
        <Text style={styles.loadingText}>Loading recipe details...</Text>
      </View>
    );
  }

  if (error) {
    Alert.alert("Error", "Failed to fetch recipe details.");
    return null;
  }

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Recipe details could not be loaded.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={styles.headerTitle}>Recipe Details</Text>
      </View>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.title}>{recipe.title}</Text>
      <BookmarkIcon
        isBookmarked={isBookmarked}
        onPress={() =>
          toggleBookmark({
            recipeId: recipeId,
            title: recipe.title,
            image: recipe.image,
          })
        }
      />
      <Text style={styles.sectionPortions}>Servings: {recipe.servings}</Text>
      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {recipe.extendedIngredients.map((ingredient) => (
        <Text key={ingredient.id} style={styles.text}>
          - {ingredient.original}
        </Text>
      ))}
      <Text style={styles.sectionTitle}>Instructions:</Text>
      <Text style={styles.text}>
        {recipe.instructions || "No instructions available."}
      </Text>
    </ScrollView>
  );
}
