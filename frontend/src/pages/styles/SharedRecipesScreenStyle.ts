import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#545454",
    marginBottom: 16,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#737373",
    marginTop: 8,
  },
  errorText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#FF6F61",
    textAlign: "center",
  },
});
