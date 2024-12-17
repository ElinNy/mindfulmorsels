import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { styles } from "./styles/HomeScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../components/navigation/navigationTypes";

type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName || "User");
        setIsLoggedIn(true);
      } else {
        setDisplayName(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleButtonPress = () => {
    if (isLoggedIn) {
      navigation.navigate("Recipes");
    } else {
      navigation.navigate("LikedRecipes");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {displayName ? (
          <>
            <Text style={styles.title}>Hello, {displayName}!</Text>
            <Text style={styles.subtitle}>
              Start generating recipes to reduce waste.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>Welcome to Mindful Morsels!</Text>
            <Text style={styles.subtitle}>
              Your guide to reducing food waste.
            </Text>
          </>
        )}
      </View>
  
      <View style={styles.imageRow}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/pic5.webp")}
            style={styles.image}
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/pic2.jpg")}
            style={styles.image}
          />
        </View>
      </View>
  
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>
          {isLoggedIn ? "Generate Recipes" : "View Shared Recipes"}
        </Text>
      </TouchableOpacity>
  
      <View style={styles.imageRow}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/pic1.jpg")}
            style={styles.image}
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/pic4.webp")}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
  
}
