// src/pages/auth/GoogleLoginScreen.tsx

import React, { useEffect } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import Constants from "expo-constants";

export default function GoogleLoginScreen() {
  const googleClientId = Constants.expoConfig?.extra?.googleClientId;


  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: googleClientId,
    redirectUri: 'https://auth.expo.io/@elinny/mindful-morsels',
  });
  

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("Inloggad användare:", userCredential.user);
        })
        .catch((error) => {
          console.error("Fel vid Google-inloggning:", error);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logga in med Google</Text>
      <Button
        title="Logga in med Google"
        onPress={() => {
          promptAsync();
        }}
        disabled={!request}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});
