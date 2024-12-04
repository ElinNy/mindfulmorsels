import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

interface BookmarkIconProps {
  isBookmarked: boolean;
  onPress: () => void;
}

export default function BookmarkIcon({
  isBookmarked,
  onPress,
}: BookmarkIconProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={
          isBookmarked
            ? require("../../../assets/icons/bookmarkFilled.png") 
            : require("../../../assets/icons/bookmarkOutlined.png") 
        }
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});
