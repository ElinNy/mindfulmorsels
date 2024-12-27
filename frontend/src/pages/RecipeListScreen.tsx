import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { styles } from "./styles/RecipeListScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../components/navigation/navigationTypes";
import ListCard from "../components/listcard/ListCard";
import { useBookmarks } from "../context/BookmarkContext";
import { useShareRecipe } from "../hooks/useShareRecipe";
import DietaryPreferenceDropdown from "../components/dietaryPreferenceDropdown/DietaryPreferenceDropdown";
import { usePreferences } from "../hooks/usePreferences";
import ServingFilter from "../components/servingFilter/ServingFilter";
import BackButton from "../components/backButton/BackButton";
import { useRecipes } from "../hooks/useRecipes";
import IngredientPills from "../components/ingredientPill/ingredientPill";

type NavigationProp = StackNavigationProp<RootStackParamList, "Recipes">;

const dietaryPreferences = [
  { id: "glutenFree", label: "Gluten Free" },
  { id: "dairyFree", label: "Dairy Free" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
];

export default function RecipeListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { handleShareRecipe } = useShareRecipe();
  const { bookmarkedRecipes, toggleBookmark } = useBookmarks();
  const { selectedPreferences, togglePreference } = usePreferences();

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState<string>("");
  const [servings, setServings] = useState<number | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const {
    recipes,
    isLoading,
    handleSearch,
    loadMoreRecipes,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useRecipes(ingredients, selectedPreferences, servings);

  const handleAddIngredient = () => {
    if (ingredientInput.trim() === "") {
      Alert.alert("Invalid Input", "Please enter a valid ingredient.");
      return;
    }
    setIngredients((prev) => [...prev, ingredientInput.trim()]);
    setIngredientInput("");
    setShowFilters(true);
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients((prev) => prev.filter((item) => item !== ingredient));
    if (ingredients.length <= 1) {
      setShowFilters(false);
    }
  };

  const handleSearchWithFlag = () => {
    setHasSearched(true);
    setShowFilters(false);
    handleSearch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={styles.header}>Generate Recipes</Text>
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={require("../../assets/icons/ingredients.png")}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.searchInputWithIcon}
          placeholder="Enter an ingredient..."
          value={ingredientInput}
          onChangeText={setIngredientInput}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddIngredient}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <IngredientPills
        ingredients={ingredients}
        onRemoveIngredient={handleRemoveIngredient}
      />
      {showFilters && (
        <View style={styles.overlay}>
          <View style={styles.dropdownContainer}>
            <IngredientPills
              ingredients={ingredients}
              onRemoveIngredient={handleRemoveIngredient}
            />
            <View style={styles.diet}>
              <DietaryPreferenceDropdown
                preferences={dietaryPreferences}
                selectedPreferences={selectedPreferences}
                onTogglePreference={togglePreference}
              />
              <ServingFilter onChange={setServings} />
            </View>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearchWithFlag}
            >
              <Text style={styles.searchButtonText}>Find Recipes</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!hasSearched && recipes.length === 0 && (
        <View style={styles.placeholderContainer}>
          <Image
            source={require("../../assets/images/pic6.jpg")}
            style={styles.placeholderImage}
          />
          <Text style={styles.placeholderText}>
            Add ingredients to find recipes!
          </Text>
        </View>
      )}

      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#FF6F61" />
        </View>
      )}
      {hasSearched && recipes.length > 0 && (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListCard
              recipeId={item.id}
              title={item.title}
              image={item.image}
              isBookmarked={bookmarkedRecipes.some(
                (bookmark) => bookmark.recipeId === item.id
              )}
              onBookmarkPress={() => toggleBookmark(item)}
              onPress={() =>
                navigation.navigate("RecipeDetails", { recipeId: item.id })
              }
              showShareIcon={true}
              onSharePress={() =>
                handleShareRecipe({
                  recipeId: item.id,
                  title: item.title,
                  image: item.image,
                })
              }
            />
          )}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={
            hasNextPage ? (
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.loadMoreButton}
                  onPress={loadMoreRecipes}
                >
                  {isFetchingNextPage ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.loadMoreButtonText}>Load More</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}
