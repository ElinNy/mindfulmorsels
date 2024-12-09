import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/pages/HomeScreen";
import LoginScreen from "./src/pages/auth/LoginScreen";
import RecipeListScreen from "./src/pages/RecipeListScreen";
import { useFonts } from "expo-font";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import RecipeDetailsScreen from "./src/pages/RecipeDetailScreen";
import MyRecipesScreen from "./src/pages/MyRecipesScreen";
import SharedRecipesScreen from "./src/pages/SharedRecipesScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigation from "./src/components/navigation/Navbar";
import "./assets/global/styles.web.css";


const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          console.log("User logged in:", currentUser.email);
          setUser(currentUser);
          await AsyncStorage.setItem("user", JSON.stringify(currentUser));
        } else {
          console.log("No user logged in.");
          setUser(null);
          await AsyncStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error handling auth state:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FCF5EB" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <View style={styles.appContainer}>
        <Navigation user={user} />
        <Stack.Navigator
          initialRouteName={user ? "Home" : "Login"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Recipes" component={RecipeListScreen} />
          <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
          <Stack.Screen name="MyRecipes" component={MyRecipesScreen} />
          <Stack.Screen name="LikedRecipes" component={SharedRecipesScreen} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
  
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF5EB",
  },
  appContainer: {
    flex: 1,
    backgroundColor: "#FCF5EB",
    paddingTop: 10,
  },
  
});
