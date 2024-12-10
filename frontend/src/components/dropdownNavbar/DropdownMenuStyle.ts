import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: 75,
    left: 0,
    right: 0,
    width: width,
    backgroundColor: "#F9F8F8",
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
     marginLeft: 10,
    marginBottom: 5,
  },
  displayName: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#3DA510",
    textAlign: "left",
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 0,
  },
  leftMenu: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 0,
  },
  rightMenu: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop:72,
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
