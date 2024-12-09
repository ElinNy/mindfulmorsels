import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/navigationTypes";
import styles from "./DropdownMenuStyle";

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface DropdownMenuProps {
  user: any;
  navigation: NavigationProp;
  onLogout: () => void;
  closeDropdown: () => void;
}

const DropdownMenu = ({ user, navigation, onLogout, closeDropdown }: DropdownMenuProps) => {
  return (
    <View style={styles.dropdown}>
      {user?.displayName && (
        <View style={styles.displayNameContainer}>
          <Text style={styles.displayName}>Welcome, {user.displayName}!</Text>
        </View>
      )}
      <View style={styles.menuRow}>
        <View style={styles.leftMenu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              closeDropdown();
              navigation.navigate("Recipes");
            }}
          >
            <Text style={styles.menuText}>Generate Recipes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              closeDropdown();
              navigation.navigate("LikedRecipes");
            }}
          >
            <Text style={styles.menuText}>Liked Recipes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              closeDropdown();
              navigation.navigate("MyRecipes");
            }}
          >
            <Text style={[styles.menuText, { color: "#3DA510", fontFamily: "Poppins-Bold" }]}>
              My Recipes
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightMenu}>
          <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
            <Text style={[styles.menuText, { color: "#FF6F61",fontFamily: "Poppins-Bold" }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DropdownMenu;
