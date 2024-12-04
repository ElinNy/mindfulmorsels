import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#737373",
    fontFamily: "Poppins-Regular",
  },
  errorText: {
    fontSize: 16,
    color: "#FF6F61",
    fontFamily: "Poppins-Regular",
  },
  flatListContent: {
    flexGrow: 1,
    padding: 16, 
  },
});
