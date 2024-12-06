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
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginTop: 50,
    width: 30,
    height: 30,
  },
  title: {
    marginLeft: 10,
    marginTop: 60,
    fontFamily: "Poppins-Bold",
    fontSize: 20,
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    elevation: 10, 
    zIndex: 999, 
  },  
  displayNameContainer: {
    paddingBottom: 5, 
  },
  displayName: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#545454",
    textAlign: "left",
    marginLeft: 10,
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10, 
  },
  leftMenu: {
    flexDirection: "column",
  },
  rightMenu: {
    alignItems: "flex-end",
    marginTop:80,
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
