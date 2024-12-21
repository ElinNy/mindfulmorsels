import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "#ccc",
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
    paddingBottom: 0,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color:"#545454",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  footer: {
    marginBottom:150,
    justifyContent: "center",
    alignItems: "center",
  },

  loadMoreButton: {
    backgroundColor: "#FF6F61",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  loadMoreButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  placeholderImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    marginBottom: 20,
    marginTop: 250,
    borderRadius:8,
  },
  
  placeholderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#545454",
    textAlign: "center",
  },
  
  dropdownContainer: {
    position: "absolute",
    top: 200,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 10,
    padding: 16,
    borderRadius: 10,
    elevation: 5,
  },
  
});
