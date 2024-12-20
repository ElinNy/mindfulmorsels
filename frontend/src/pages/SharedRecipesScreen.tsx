import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { styles } from "./styles/SharedRecipesScreenStyle";
import ListCard from "../components/listcard/ListCard";
import { fetchPaginatedSharedRecipes } from "../utils/firebaseUtils";
import { useBookmarks } from "../hooks/useBookmarks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../components/navigation/navigationTypes";
import { useNavigation } from "@react-navigation/native";
import { DocumentSnapshot } from "firebase/firestore";
import Rating from "../components/rating/Rating";
import BackButton from "../components/backButton/BackButton";

type NavigationProp = StackNavigationProp<RootStackParamList, "Recipes">;

export default function SharedRecipesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { bookmarkedRecipes, toggleBookmark, fetchBookmarks } = useBookmarks();
  const [sharedRecipes, setSharedRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInitialRecipes();
    fetchBookmarks();
  }, []);

  const loadInitialRecipes = async () => {
    try {
      setLoading(true);
      const { recipes, lastVisible } = await fetchPaginatedSharedRecipes(10);
      setSharedRecipes(recipes);
      setLastDoc(lastVisible);
    } catch (error) {
      console.error("Error fetching shared recipes:", error);
      setError("Failed to load recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreRecipes = async () => {
    if (loadingMore || !lastDoc) return;
  
    try {
      setLoadingMore(true);
      const { recipes, lastVisible } = await fetchPaginatedSharedRecipes(11, lastDoc); 
  
      if (recipes.length <= 10) {
        setLastDoc(null);
      }
  
      setSharedRecipes((prev) => [...prev, ...recipes.slice(0, 10)]);

      if (recipes.length === 11) {
        setLastDoc(lastVisible);
      }
    } catch (error) {
      console.error("Error loading more shared recipes:", error);
      setError("Failed to load more recipes.");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={styles.header}>Shared Recipes</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#FF6F61" />
          <Text style={styles.loadingText}>Loading shared recipes...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : sharedRecipes.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>No shared recipes available.</Text>
        </View>
      ) : (
        <FlatList
          data={sharedRecipes}
          keyExtractor={(item) => item.recipeId.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <ListCard
                recipeId={item.recipeId}
                title={item.title}
                image={item.image}
                isBookmarked={bookmarkedRecipes.some((bookmark) => bookmark.recipeId === item.recipeId)}
                onPress={() => navigation.navigate("RecipeDetails", { recipeId: item.recipeId })}
                onBookmarkPress={() => toggleBookmark(item)}
              />
              <Rating recipeId={item.recipeId} />
            </View>
          )}
          ListFooterComponent={
            <View style={styles.footer}>
              {loadingMore ? (
                <View style={styles.footer}>
                  <ActivityIndicator size="small" color="#FF6F61" />
                  <Text style={styles.loadingText}>Loading more recipes...</Text>
                </View>
              ) : lastDoc ? (
                <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreRecipes}>
                  <Text style={styles.loadMoreButtonText}>Load More</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          }   
        />
      )}
    </View>
  );
}
