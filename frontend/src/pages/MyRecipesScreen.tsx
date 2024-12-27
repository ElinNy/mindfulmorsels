import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../components/navigation/navigationTypes";
import { styles } from "./styles/MyRecipesScreenStyle";
import ListCard from "../components/listcard/ListCard";
import { useBookmarks } from "../context/BookmarkContext"; // Använd BookmarkContext
import { useShareRecipe } from "../hooks/useShareRecipe";
import BackButton from "../components/backButton/BackButton";

type MyRecipesNavigationProp = StackNavigationProp<RootStackParamList, "MyRecipes">;

export default function MyRecipesScreen() {
  const { bookmarkedRecipes, toggleBookmark, loading } = useBookmarks(); // Hämtar från BookmarkContext
  const { handleShareRecipe } = useShareRecipe();
  const navigation = useNavigation<MyRecipesNavigationProp>();
  const [paginatedBookmarks, setPaginatedBookmarks] = useState<any[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const PAGE_SIZE = 10;

  useEffect(() => {
    if (!loading && bookmarkedRecipes.length > 0) {
      loadInitialBookmarks();
    }
  }, [loading, bookmarkedRecipes]);

  const loadInitialBookmarks = () => {
    const initialData = bookmarkedRecipes.slice(0, PAGE_SIZE);
    setPaginatedBookmarks(initialData);
    setNoMoreData(initialData.length >= bookmarkedRecipes.length);
  };

  const loadMoreBookmarks = () => {
    if (loadingMore || noMoreData) return;

    setLoadingMore(true);
    const nextData = bookmarkedRecipes.slice(
      paginatedBookmarks.length,
      paginatedBookmarks.length + PAGE_SIZE
    );

    setPaginatedBookmarks((prev) => [...prev, ...nextData]);
    setNoMoreData(paginatedBookmarks.length + nextData.length >= bookmarkedRecipes.length);
    setLoadingMore(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={styles.header}>My Recipes</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#FF6F61" />
          <Text style={styles.loadingText}>Loading your saved recipes...</Text>
        </View>
      ) : paginatedBookmarks.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>You have no saved recipes yet.</Text>
        </View>
      ) : (
        <FlatList
          data={paginatedBookmarks}
          keyExtractor={(item) => item.recipeId.toString()}
          renderItem={({ item }) => (
            <ListCard
              recipeId={item.recipeId}
              title={item.title}
              image={item.image}
              isBookmarked={true}
              onBookmarkPress={() => toggleBookmark(item)}
              onSharePress={() =>
                handleShareRecipe({
                  recipeId: item.recipeId,
                  title: item.title,
                  image: item.image,
                })
              }
              onPress={() =>
                navigation.navigate("RecipeDetails", {
                  recipeId: item.recipeId,
                })
              }
            />
          )}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={
            <View style={styles.footer}>
              {loadingMore ? (
                <View style={styles.footer}>
                  <ActivityIndicator size="small" color="#FF6F61" />
                  <Text style={styles.loadingText}>
                    Loading more recipes...
                  </Text>
                </View>
              ) : (
                !noMoreData && (
                  <TouchableOpacity
                    style={styles.loadMoreButton}
                    onPress={loadMoreBookmarks}
                  >
                    <Text style={styles.loadMoreButtonText}>Load More</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          }
        />
      )}
    </View>
  );
}
