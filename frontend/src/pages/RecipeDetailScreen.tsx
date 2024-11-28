import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { getRecipeDetails } from "../spoonacular/spoonacularAPI";
import { styles } from "./styles/RecipeDetailScreenStyle";
import BookmarkIcon from "../components/bookmark/BookmarkIcon";
import {
  addBookmark,
  removeBookmark,
  isBookmarked,
} from "../utils/firebaseUtils";

export default function RecipeDetailsScreen({ route }: any) {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isBookmarkedState, setIsBookmarkedState] = useState<boolean>(false);
  const [bookmarkLoading, setBookmarkLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getRecipeDetails(recipeId);
        setRecipe(details);

        // Är receptet bookmärkt?
        const favorited = await isBookmarked(recipeId);
        setIsBookmarkedState(favorited);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        Alert.alert("Fel", "Kunde inte hämta receptdetaljer.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [recipeId]);

  const handleBookmarkToggle = async () => {
    setBookmarkLoading(true);
    try {
      if (isBookmarkedState) {
        await removeBookmark(recipeId);
        setIsBookmarkedState(false);
        Alert.alert("Borttagen", "Receptet har tagits bort från dina bokmärken.");
      } else {
        await addBookmark(recipe);
        setIsBookmarkedState(true);
        Alert.alert("Sparad", "Receptet har lagts till dina bokmärken.");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      Alert.alert("Fel", "Kunde inte uppdatera bokmärket.");
    } finally {
      setBookmarkLoading(false);
    }
  };

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
          isBookmarked={isBookmarkedState}
          onPress={handleBookmarkToggle}
        />
      </View>
      <Text style={styles.sectionTitle}>Ingredienser:</Text>
      {recipe.extendedIngredients.map((ingredient: any) => (
        <Text key={ingredient.id} style={styles.text}>
          - {ingredient.original}
        </Text>
      ))}
      <Text style={styles.sectionTitle}>Instruktioner:</Text>
      <Text style={styles.text}>
        {recipe.instructions || "Inga instruktioner tillgängliga."}
      </Text>
    </ScrollView>
  );
}
