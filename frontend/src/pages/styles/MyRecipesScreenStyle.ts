import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F8F8F8",
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: "#737373",
    },
    errorText: {
      fontSize: 16,
      color: "#FF6F61",
    },
    card: {
      marginBottom: 16,
      borderRadius: 10,
      backgroundColor: "#FFFFFF",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 4,
      overflow: "hidden",
      padding: 16,
    },
    image: {
      width: "100%",
      height: 150,
      borderRadius: 10,
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    },
    listContent: {
      padding: 16,
    },
  });