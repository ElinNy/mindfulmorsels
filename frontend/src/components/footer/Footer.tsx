import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { styles } from "./FooterStyle";

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>
        Recipes provided by{" "}
        <Text
          style={styles.linkText}
          onPress={() => Linking.openURL("https://spoonacular.com/")}
        >
          @Spoonacular
        </Text>
      </Text>
    </View>
  );
};


export default Footer;