import {StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      top: 10,
      right: 10,
      paddingRight:6,
      marginTop:8,
    },
    starIcon: {
      width: 20,
      height: 20,
      marginLeft: 4,
    },
    likesText: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#333",
    },
  });
  