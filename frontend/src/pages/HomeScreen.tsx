import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import {styles} from "./styles/HomeScreenStyle";

export default function HomeScreen() {
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName || "User");
      } else {
        setDisplayName(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {displayName ? (
        <>
          <Text style={styles.title}>Hello, {displayName}!</Text>
          <Text style={styles.subtitle}>Start generating recipes to reduce waste.</Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>Welcome to Mindful Morsels!</Text>
          <Text style={styles.subtitle}>Your guide to reducing food waste.</Text>
        </>
      )}
    </View>
  );
}

