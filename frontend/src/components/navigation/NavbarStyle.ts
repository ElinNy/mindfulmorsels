import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 120,
    backgroundColor: "#FCF5EB",
  },
  icon: {
    marginTop: 50,
    width: 30,
    height: 30,
  },
  title: {
    marginTop: 70,
    fontSize: 20,
    fontWeight: "bold",
    color: "#737373",
  },
  logo: {
    marginTop: 50,
    width: 40,
    height: 40,
  },
  dropdown: {
    position: "absolute",
    top: 120,
    right: 0,
    width: 430,
    backgroundColor: "#FCF5EB",
    padding: 16,
    shadowColor: "000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    elevation: 5,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftMenu: {
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  rightMenu: {
    justifyContent: "flex-end",
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  menuText: {
    fontSize: 16,
    color: "#545454",
  },
});

export default styles;
