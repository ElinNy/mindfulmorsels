import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../components/navigation/navigationTypes";
import { styles } from "./styles/LoginScreenStyle";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        Alert.alert(
          "Welcome",
          `Logged in as ${
            userCredential.user.displayName || userCredential.user.email
          }`
        );
        navigation.navigate("Home");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (userCredential.user) {
          await updateProfile(userCredential.user, { displayName });
        }

        Alert.alert("Success", `Account created for ${displayName}`);
        navigation.navigate("Home");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message || "Something went wrong");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>{isLogin ? "Log In" : "Sign Up"}</Text>
        {!isLogin && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              style={styles.input}
              value={displayName}
              onChangeText={setDisplayName}
            />
          </View>
        )}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
          <Text style={styles.authButtonText}>
            {isLogin ? "Come on in!" : "Join us!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setIsLogin(!isLogin)}
        >
          <TouchableOpacity
            style={styles.authGoogle}
            onPress={() => navigation.navigate("GoogleLogin")}
          >
            <Text style={styles.authGoogleButtonText}>Log in with Google</Text>
          </TouchableOpacity>

          <Text style={styles.switchButtonText}>
            <Text style={styles.primaryText}>
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
            </Text>
            <Text style={styles.highlight}>
              {isLogin ? "Sign Up" : "Log In"}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
