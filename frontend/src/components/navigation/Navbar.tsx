import React, { useState } from "react";
import { Text, View, Image, Alert, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./navigationTypes";
import { auth } from "../../firebase/firebaseConfig";
import styles from "./NavbarStyle";
import DropdownMenu from "../dropdownNavbar/DropdownMenu";

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

      {dropdownVisible && user && (
        <DropdownMenu
          user={user}
          navigation={navigation}
          onLogout={handleLogout}
          closeDropdown={() => setDropdownVisible(false)}
        />
      )}
    </View>
  );
}
