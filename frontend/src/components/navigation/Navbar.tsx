import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./navigationTypes";
import { auth } from "../../../firebaseConfig";
import styles from "./NavbarStyle";

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function Navigation() {
  const [user, setUser] = useState<any>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged Out", "You have been logged out.");
      setDropdownVisible(false);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message || "Failed to log out.");
      }
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          style={styles.logo}
          source={require("../../../assets/icons/salad.png")}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Mindful 🌿 Morsels</Text>

      {/* Visa antingen login-ikon eller hamburgar-meny */}
      {user ? (
        <TouchableOpacity onPress={toggleDropdown}>
          <Image
            style={styles.icon}
            source={require("../../../assets/icons/hamburger.png")}
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

      {/* Dropdown-menyn */}
      {dropdownVisible && user && (
        <View style={styles.dropdown}>
          <View style={styles.leftMenu}>
            {/* Vänstra delen av menyn */}
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Generate Recipes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Liked Recipes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text
                style={[
                  styles.menuText,
                  { color: "#FF6F61", fontWeight: "bold" },
                ]}
              >
                My Recipes
              </Text>
            </TouchableOpacity>
          </View>

          {/* Högra delen av menyn */}
          <View style={styles.rightMenu}>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Text style={[styles.menuText, { color: "#3DA510" }]}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
