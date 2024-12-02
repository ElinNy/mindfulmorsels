import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { styles } from "./styles/SharedRecipesScreenStyle";
import ListCard from "../components/listcard/ListCard";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function SharedRecipesScreen() {
  const [sharedRecipes, setSharedRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSharedRecipes = async () => {
      try {
        const sharedRecipesCollection = collection(db, "sharedRecipes");
        const snapshot = await getDocs(sharedRecipesCollection);

        const recipes = snapshot.docs.map((doc) => ({
          recipeId: doc.id,
          ...doc.data(),
        }));

        setSharedRecipes(recipes);
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
          <ListCard
            recipeId={item.recipeId}
            title={item.title}
            image={item.image}
            isBookmarked={false}
            onPress={() => console.log(`Navigating to recipe ${item.recipeId}`)}
            onBookmarkPress={() => console.log("Bookmark pressed!")}
            showShareIcon={false} // Dölj dela-knappen
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
