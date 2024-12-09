import React, { useState } from "react";
import { Text, View, Image, Alert, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./navigationTypes";
import { auth } from "../../firebase/firebaseConfig";
import styles from "./NavbarStyle";

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface NavbarProps {
  user: any;
}

export default function Navigation({ user }: NavbarProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged Out", "You have been logged out.");
      setDropdownVisible(false);
      navigation.navigate("Home");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message || "Failed to log out.");
      }
    }
  };

  const toggleDropdown = () => {
    console.log("Hamburger icon clicked");
    setDropdownVisible((prev) => !prev);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.logoContainer}
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/icons/salad.png")}
        />
        <Text style={styles.title}>Mindful 🌿 Morsels</Text>
      </TouchableOpacity>

      {user ? (
        <TouchableOpacity onPress={toggleDropdown}>
          <Image
            style={styles.icon}
            source={require("../../../assets/icons/salad.png")}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Image
            style={styles.icon}
            source={require("../../../assets/icons/login.png")}
          />
        </TouchableOpacity>
      )}

      {dropdownVisible && user && (
        <View style={styles.dropdown}>
          {user?.displayName && (
            <View style={styles.displayNameContainer}>
              <Text style={styles.displayName}>
                Welcome, {user.displayName}!
              </Text>
            </View>
          )}
          <View style={styles.menuRow}>
            <View style={styles.leftMenu}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setDropdownVisible(false);
                  navigation.navigate("Recipes");
                }}
              >
                <Text style={styles.menuText}>Generate Recipes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setDropdownVisible(false);
                  navigation.navigate("LikedRecipes");
                }}
              >
                <Text style={styles.menuText}>Liked Recipes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setDropdownVisible(false);
                  navigation.navigate("MyRecipes");
                }}
              >
                <Text
                  style={[styles.menuText, { color: "#FF6F61", fontWeight: "bold" }]}
                >
                  My Recipes
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rightMenu}>
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Text style={[styles.menuText, { color: "#3DA510" }]}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
