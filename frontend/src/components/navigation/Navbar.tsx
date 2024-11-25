import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./NavbarStyle";

export default function Navigation() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const menuItems = [
    { id: "1", title: "Generate Recipes" },
    { id: "2", title: "Liked Recipes" },
    { id: "3", title: "My Recipes", color:"#FF6F61", fontWeightBold: "bold"}, 
  ];
  const logoutItem = { id: "4", title: "Logout", color:"#3DA510" }; 

  const toggleDropdown = () => {
    console.log("Hamburger menu pressed!");
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <View style={styles.navbar}>
      <Image
        style={styles.logo}
        source={require("../../../assets/icons/salad.png")}
      />
      <Text style={styles.title}>Mindful 🌿 Morsels</Text>

      <TouchableOpacity onPress={toggleDropdown}>
        <Image
          style={styles.icon}
          source={require("../../../assets/icons/hamburger.png")}
        />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdown}>
          <View style={styles.leftMenu}>
            {menuItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.menuItem}>
                <Text
                  style={[
                    styles.menuText,
                    item.color && { color: item.color }, 
                    item.fontWeightBold && {fontWeight:"bold"},
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.rightMenu}>
            <TouchableOpacity style={styles.menuItem}>
              <Text
                style={[
                  styles.menuText,
                  { color: logoutItem.color }, 
                ]}
              >
                {logoutItem.title}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
