import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../components/navigation/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import {styles} from "./styles/emailPasswordStyle";

type NavigationProp = StackNavigationProp<RootStackParamList, "Login">;

export default function EmailPasswordAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        Alert.alert("Welcome", `Logged in as ${userCredential.user.email}`);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        Alert.alert("Success", `Account created for ${userCredential.user.email}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message || "Something went wrong");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Log In" : "Sign Up"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={isLogin ? "Log In" : "Sign Up"} onPress={handleAuth} />
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.link}>
          {isLogin
            ? "Don't have an account? Sign up here"
            : "Already have an account? Log in here"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

