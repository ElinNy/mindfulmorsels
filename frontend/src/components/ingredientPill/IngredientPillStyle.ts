import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

pillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
    paddingHorizontal: 10,
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
});