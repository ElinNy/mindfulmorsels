import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/components/navigation/Navbar";
import GoogleLoginScreen from "./src/pages/auth/googleAuth";

export default function App() {
  return (
    <>
      <Navigation />
      <View style={styles.container}>
        <GoogleLoginScreen />
        <Text>Hello MindfulMorsels!</Text>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
});
