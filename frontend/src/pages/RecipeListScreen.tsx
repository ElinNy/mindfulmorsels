import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { fetchRecipes } from "../spoonacular/spoonacularAPI";
import { styles } from "./styles/RecipeListScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../components/navigation/navigationTypes";
import ListCard from "../components/listcard/ListCard";
import { useBookmarks } from "../hooks/useBookmarks";

type NavigationProp = StackNavigationProp<RootStackParamList, "Recipes">;

export default function RecipeListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");

  const { bookmarkedRecipes, toggleBookmark } = useBookmarks();

  const handleSearch = async () => {
    if (query.trim() === "") {
      Alert.alert("Invalid Input", "Please enter a search query.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchRecipes(query);
      setRecipes(data);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Sökfält */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for recipes..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Laddar eller visar fel */}
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#FF6F61" />
          <Text style={styles.loadingText}>Loading recipes...</Text>
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Visar recept */}
      {!loading && !error && (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListCard
              title={item.title}
              image={item.image}
              isBookmarked={bookmarkedRecipes.some(
                (bookmark) => bookmark.recipeId === item.id
              )}
              onBookmarkPress={() => toggleBookmark(item)}
              onPress={() =>
                navigation.navigate("RecipeDetails", { recipeId: item.id })
              }
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}
