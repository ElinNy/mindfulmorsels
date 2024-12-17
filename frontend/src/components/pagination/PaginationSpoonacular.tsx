import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { fetchRecipes } from "../../spoonacular/spoonacularAPI";
import ListCard from "../listcard/ListCard";
import { styles } from "./PaginationSpoonacularStyle";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../components/navigation/navigationTypes";
import { useBookmarks } from "../../hooks/useBookmarks";
import { useShareRecipe } from "../../hooks/useShareRecipe";

type NavigationProp = StackNavigationProp<RootStackParamList, "RecipeDetails">;

interface PagineringSpoonacularProps {
  ingredients: string[];
  dietaryFilters: string;
}

const PagineringSpoonacular: React.FC<PagineringSpoonacularProps> = ({ ingredients, dietaryFilters }) => {
  const navigation = useNavigation<NavigationProp>();
  const { bookmarkedRecipes, toggleBookmark } = useBookmarks();
  const { handleShareRecipe } = useShareRecipe();

  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInitialRecipes();
  }, [ingredients, dietaryFilters]);

  const fetchInitialRecipes = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecipes(ingredients.join(","), dietaryFilters, 0, 10);
      setRecipes(data);
      setOffset(10);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreRecipes = async () => {
    if (loadingMore || recipes.length === 0) return;
    setLoadingMore(true);
    try {
      const data = await fetchRecipes(ingredients.join(","), dietaryFilters, offset, 10);
      if (data.length > 0) {
        setRecipes((prev) => [...prev, ...data]);
        setOffset(offset + 10);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load more recipes.");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6F61" />
          <Text style={styles.loadingText}>Loading recipes...</Text>
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListCard
            recipeId={item.id}
            title={item.title}
            image={item.image}
            isBookmarked={bookmarkedRecipes.some((bookmark) => bookmark.recipeId === item.id)}
            onBookmarkPress={() => toggleBookmark(item)}
            onPress={() => navigation.navigate("RecipeDetails", { recipeId: item.id })}
            showShareIcon={true}
            onSharePress={() => handleShareRecipe({ recipeId: item.id, title: item.title, image: item.image })}
          />
        )}
        onEndReached={loadMoreRecipes}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color="#FF6F61" />
              <Text style={styles.loadingText}>Loading more recipes...</Text>
            </View>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 50 }}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

export default PagineringSpoonacular;
