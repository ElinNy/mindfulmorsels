import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../components/navigation/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import {styles} from "./styles/MyRecipesScreenStyle";

type MyRecipesNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MyRecipes"
>;

export default function MyRecipesScreen() {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<MyRecipesNavigationProp>();

  useEffect(() => {
    const fetchBookmarkedRecipes = async () => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("No user is logged in.");

        const bookmarksCollection = collection(db, "users", user.uid, "bookmarks");
        const snapshot = await getDocs(bookmarksCollection);

        const recipes = snapshot.docs.map((doc) => doc.data());
        setBookmarkedRecipes(recipes);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
        setError("Failed to load bookmarked recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedRecipes();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6F61" />
        <Text style={styles.loadingText}>Loading your saved recipes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
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
    <FlatList
      data={bookmarkedRecipes}
      keyExtractor={(item) => item.recipeId.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("RecipeDetails", { recipeId: item.recipeId })}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.listContent}
    />
  );
}