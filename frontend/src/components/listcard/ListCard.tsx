import React from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { styles } from "./ListCardStyle";
import BookmarkIcon from "../bookmark/BookmarkIcon";

interface ListCardProps {
  title: string;
  image: string;
  onPress: () => void;
  isBookmarked: boolean;
  onBookmarkPress: () => void;
  customStyle?: object;
}

const ListCard: React.FC<ListCardProps> = ({
  title,
  image,
  onPress,
  isBookmarked,
  onBookmarkPress,
  customStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, customStyle]}>
      <View style={styles.iconContainer}>
        <BookmarkIcon isBookmarked={isBookmarked} onPress={onBookmarkPress} />
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListCard;
