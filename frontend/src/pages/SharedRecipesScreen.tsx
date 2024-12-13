import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { styles } from "./styles/SharedRecipesScreenStyle";
import ListCard from "../components/listcard/ListCard";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useBookmarks } from "../hooks/useBookmarks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../components/navigation/navigationTypes";
import { useNavigation } from "@react-navigation/native";
import Rating from "../components/rating/Rating";

type NavigationProp = StackNavigationProp<RootStackParamList, "Recipes">;

export default function SharedRecipesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { bookmarkedRecipes, toggleBookmark, fetchBookmarks } = useBookmarks();
  const [sharedRecipes, setSharedRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSharedRecipes = async () => {
      try {
        const sharedRecipesCollection = collection(db, "sharedRecipes");
        const snapshot = await getDocs(sharedRecipesCollection);
        const recipes = snapshot.docs.map((doc) => ({
          recipeId: Number(doc.id),
          ...doc.data(),
        }));
        setSharedRecipes(recipes);
        await fetchBookmarks();
      } catch (error) {
        console.error("Error fetching shared recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedRecipes();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6F61" />
        <Text style={styles.loadingText}>Loading shared recipes...</Text>
      </View>
    );
  }

  if (sharedRecipes.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>No shared recipes yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shared Recipes</Text>
      <FlatList
        data={sharedRecipes}
        keyExtractor={(item) => item.recipeId.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <ListCard
              recipeId={item.recipeId}
              title={item.title}
              image={item.image}
              isBookmarked={bookmarkedRecipes.some(
                (bookmark) => bookmark.recipeId === item.recipeId
              )}
              onPress={() =>
                navigation.navigate("RecipeDetails", { recipeId: item.recipeId })
              }
              onBookmarkPress={() => toggleBookmark(item)}
              showShareIcon={false}
            />
            <Rating recipeId={item.recipeId} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
