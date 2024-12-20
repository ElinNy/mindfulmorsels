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
import { fetchRecipes, getRecipeDetails } from "../spoonacular/spoonacularAPI";
import { styles } from "./styles/RecipeListScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../components/navigation/navigationTypes";
import ListCard from "../components/listcard/ListCard";
import { useBookmarks } from "../hooks/useBookmarks";
import { useShareRecipe } from "../hooks/useShareRecipe";
import DietaryPreferenceDropdown from "../components/dietaryPreferenceDropdown/DietaryPreferenceDropdown";
import { usePreferences } from "../hooks/usePreferences";
import { filterDietaryPreference } from "../utils/dietaryFilterUtils";
import ServingFilter from "../components/servingFilter/ServingFilter";
import BackButton from "../components/backButton/BackButton";

type NavigationProp = StackNavigationProp<RootStackParamList, "Recipes">;

const dietaryPreferences = [
  { id: "glutenFree", label: "Glutenfritt" },
  { id: "dairyFree", label: "Mjölkfritt" },
  { id: "vegetarian", label: "Vegetariskt" },
  { id: "vegan", label: "Veganskt" },
];

export default function RecipeListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { handleShareRecipe } = useShareRecipe();
  const { bookmarkedRecipes, toggleBookmark } = useBookmarks();
  const { selectedPreferences, togglePreference } = usePreferences();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showWelcomeText, setShowWelcomeText] = useState<boolean>(true);
  const [servings, setServings] = useState<number | null>(null);
  const handleAddIngredient = () => {
    if (ingredientInput.trim() === "") {
      Alert.alert("Invalid Input", "Please enter a valid ingredient.");
      return;
    }
    setIngredients((prev) => [...prev, ingredientInput.trim()]);
    setIngredientInput("");
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients((prev) => prev.filter((item) => item !== ingredient));
  };
  const handleSetServings = (newServings: number) => {
    setServings(newServings);
  };

  const handleSearch = async () => {
    if (ingredients.length === 0) {
      Alert.alert("No Ingredients", "Please add at least one ingredient.");
      return;
    }
  
    setLoading(true);
    setError(null);
    setShowWelcomeText(false);
  
    try {
      const dietaryFilters = selectedPreferences.join(",");
      console.log("Searching with ingredients:", ingredients.join(","));
      console.log("Dietary Filters:", dietaryFilters);
      let data = await fetchRecipes(ingredients.join(","), dietaryFilters);
  
      // Skapar detta för många queries till Apiet? Fick 402 väldigt snabbt
      const detailedRecipes = await Promise.all(
        data.map(async (recipe: any) => {
          const details = await getRecipeDetails(recipe.id);
          return details;
        })
      );
  
      if (servings) {
        data = detailedRecipes.filter((recipe: any) => recipe.servings === servings);
      } else {
        data = detailedRecipes;
      }
      setRecipes(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      {/* Inputfält och "Add Ingredient"-knapp */}
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

      {/* Lista med ingredienser som piller */}
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

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <DietaryPreferenceDropdown
          preferences={dietaryPreferences}
          selectedPreferences={selectedPreferences}
          onTogglePreference={togglePreference}
        />
        <ServingFilter onChange={setServings} />
      </View>

      {/* Sökknapp */}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Find Recipes</Text>
      </TouchableOpacity>

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
      />
    </View>
  );
}
