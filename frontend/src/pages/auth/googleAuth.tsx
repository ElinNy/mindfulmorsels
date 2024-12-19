import React, { useEffect, useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import Constants from "expo-constants";

export default function GoogleLoginScreen() {
  const [loading, setLoading] = useState(false);
  const googleClientId = Constants.expoConfig?.extra?.googleClientId;

  const redirectUri = "https://auth.expo.io/@elinny/mindful-morsels";

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: googleClientId,
    redirectUri,
  });

  useEffect(() => {
    console.log("useEffect körs med response:", response);

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
    } else if (response?.type === "error") {
      console.error("Google-inloggningsfel:", response.error);
    } else if (response?.type === "cancel") {
      console.log("Inloggningsförsöket avbröts.");
    } else if (response?.type === "locked") {
      console.log("En annan inloggningsprocess är redan aktiv.");
    }
  }, [response]);

  const handleGoogleLogin = async () => {
    if (!request || loading) return;

    setLoading(true);
    const result = await promptAsync();
    setLoading(false);

    console.log("Resultat från promptAsync:", result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in with Google</Text>
      <Button
        title={loading ? "Loggar in..." : "Logga in med Google"}
        onPress={handleGoogleLogin}
        disabled={!request || loading}
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
