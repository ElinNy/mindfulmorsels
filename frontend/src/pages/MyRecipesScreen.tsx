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
import { useBookmarks } from "../hooks/useBookmarks";
import { useShareRecipe } from "../hooks/useShareRecipe";
import BackButton from "../components/backButton/BackButton";

type MyRecipesNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MyRecipes"
>;

export default function MyRecipesScreen() {
  const {
    bookmarkedRecipes,
    toggleBookmark,
    fetchBookmarks,
    fetchMoreBookmarks,
    loading,
    loadingMore,
  } = useBookmarks();
  const { handleShareRecipe } = useShareRecipe();
  const navigation = useNavigation<MyRecipesNavigationProp>();
  const [noMoreData, setNoMoreData] = useState(false);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const loadMoreBookmarks = async () => {
    if (loadingMore) return;

    try {
      const newBookmarks = await fetchMoreBookmarks();

      if (newBookmarks.length < 10) {
        setNoMoreData(true);
      }
    } catch (error) {
      console.error("Error loading more bookmarks:", error);
    }
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
      ) : bookmarkedRecipes.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>You have no saved recipes yet.</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarkedRecipes}
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
