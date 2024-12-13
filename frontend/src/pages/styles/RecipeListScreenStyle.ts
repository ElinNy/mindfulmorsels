import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8F8F8",
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 16,
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  searchInputWithIcon: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#333",
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#3DA510",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  addButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
  pillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3DA510",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  pillText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    marginRight: 8,
  },
  pillCloseButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  pillCloseButtonText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins-Bold",
  },
  searchButton: {
    paddingVertical: 10,
    backgroundColor: "#FF6F61",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
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
  listContent: {
    paddingBottom: 20,
  },
});
