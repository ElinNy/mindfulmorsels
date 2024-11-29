import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    marginRight: 8,
    backgroundColor: "#fff",
    fontFamily: "Poppins-Regular",
  },
  searchButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FF6F61",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
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
  card: {
    width: "100%",
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    overflow: "hidden",
    alignItems: "center", 
    justifyContent: "center", 
  },
  image: {
    width: "80%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 20,
  },
  title: {
    padding: 15,
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#333",
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
});
