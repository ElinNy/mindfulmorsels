import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: 120,
    right: 0,
    width: 300,
    backgroundColor: "#FCF5EB",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
    zIndex: 9999,
  },
  displayNameContainer: {
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 10,
  },
  displayName: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#545454",
    textAlign: "left",
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftMenu: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  rightMenu: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuText: {
    fontSize: 16,
    color: "#545454",
  },
});

export default styles;
