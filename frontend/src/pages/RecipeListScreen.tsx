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
import { useRecipeActions } from "../hooks/useLoadMoreRecipes";

type NavigationProp = StackNavigationProp<RootStackParamList, "Recipes">;

const dietaryPreferences = [
  { id: "glutenFree", label: "Glutenfritt" },
  { id: "dairyFree", label: "Mjölkfritt" },
  { id: "vegetarian", label: "Vegetariskt" },
  { id: "vegan", label: "Veganskt" },
];

interface Recipe {
  id: number; 
  title: string;
  image: string;
}

export default function RecipeListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { handleShareRecipe } = useShareRecipe();
  const { bookmarkedRecipes, toggleBookmark, loading } = useBookmarks();
  const { selectedPreferences, togglePreference } = usePreferences();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState<string>("");
  const [servings, setServings] = useState<number | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [noMoreData, setNoMoreData] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const { handleSearch, loadMoreRecipes, loadingMore, error } = useRecipeActions(
    ingredients,
    selectedPreferences,
    servings,
    setRecipes,
    setNoMoreData
  );

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
    setNoMoreData(false);
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
        <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

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

      <View style={styles.pillContainer}>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.pill}>
            <Text style={styles.pillText}>{ingredient}</Text>
            <TouchableOpacity
              onPress={() => handleRemoveIngredient(ingredient)}
              style={styles.pillCloseButton}
            >
              <Text style={styles.pillCloseButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {showFilters && (
        <View style={styles.dropdownContainer}>
          <DietaryPreferenceDropdown
            preferences={dietaryPreferences}
            selectedPreferences={selectedPreferences}
            onTogglePreference={togglePreference}
          />
          <ServingFilter onChange={setServings} />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchWithFlag}
          >
            <Text style={styles.searchButtonText}>Find Recipes</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListCard
            recipeId={item.id}
            title={item.title}
            image={item.image}
            isBookmarked={bookmarkedRecipes.some(
              (bookmark) => String(bookmark.recipeId) === String(item.id)
            )}
            onBookmarkPress={() =>
              toggleBookmark({
                recipeId: item.id,
                title: item.title,
                image: item.image,
              })
            }
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
          hasSearched && recipes.length > 0 ? (
            <View style={styles.footer}>
              {loadingMore ? (
                <>
                  <ActivityIndicator size="small" color="#FF6F61" />
                  <Text style={styles.loadingText}>
                    Loading more recipes...
                  </Text>
                </>
              ) : (
                !noMoreData && (
                  <TouchableOpacity
                    style={styles.loadMoreButton}
                    onPress={loadMoreRecipes}
                  >
                    <Text style={styles.loadMoreButtonText}>Load More</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          ) : null
        }
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}
