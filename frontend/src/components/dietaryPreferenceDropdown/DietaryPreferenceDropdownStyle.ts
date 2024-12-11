import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    width: "45%"
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownHeaderText: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#545454",
  },
  arrowIcon: {
    width: 15,
    height: 15,
  },
  preferenceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  preferenceText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#545454",
  },
});
