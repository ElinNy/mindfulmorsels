import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#333",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#FF6F61",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#737373",
    lineHeight: 24,
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
});
