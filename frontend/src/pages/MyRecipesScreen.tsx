import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
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
  const { bookmarkedRecipes, toggleBookmark } = useBookmarks();
  const { handleShareRecipe } = useShareRecipe();
  const navigation = useNavigation<MyRecipesNavigationProp>();

  if (!bookmarkedRecipes) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6F61" />
        <Text style={styles.loadingText}>Loading your saved recipes...</Text>
      </View>
    );
  }

  if (bookmarkedRecipes.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>You have no saved recipes yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton />
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
              navigation.navigate("RecipeDetails", { recipeId: item.recipeId })
            }
          />
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}
