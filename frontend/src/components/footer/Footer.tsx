import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Linking } from "react-native";
import { styles } from "./FooterStyle";

const Footer = () => {
  const [scrollY] = useState(new Animated.Value(0));

  const footerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [60, 20], 
    extrapolate: "clamp",
  });

  useEffect(() => {
    const listener = scrollY.addListener(() => {});
    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY]);

  return (
    <Animated.View style={[styles.footerContainer, { height: footerHeight }]}>
      <Text style={styles.footerText}>
        Recipes provided by{" "}
        <Text
          style={styles.linkText}
          onPress={() => Linking.openURL("https://spoonacular.com/")}
        >
          @Spoonacular
        </Text>
      </Text>
    </Animated.View>
  );
};
export default Footer;