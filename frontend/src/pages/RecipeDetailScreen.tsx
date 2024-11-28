import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import { getRecipeDetails } from "../spoonacular/spoonacularAPI";
import { styles } from "./styles/RecipeDetailScreenStyle";

export default function RecipeDetailsScreen({ route }: any) {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getRecipeDetails(recipeId);
        setRecipe(details);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
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
        <Text style={styles.loadingText}>Loading recipe details...</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load recipe details.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {recipe.extendedIngredients.map((ingredient: any) => (
        <Text key={ingredient.id} style={styles.text}>
          - {ingredient.original}
        </Text>
      ))}
      <Text style={styles.sectionTitle}>Instructions:</Text>
      <Text style={styles.text}>{recipe.instructions || "No instructions provided."}</Text>
    </ScrollView>
  );
}
