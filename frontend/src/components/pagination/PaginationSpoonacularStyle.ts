import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
