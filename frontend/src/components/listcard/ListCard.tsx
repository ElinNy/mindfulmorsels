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
  onSharePress?: () => void; 
  showShareIcon?: boolean; 
  customStyle?: object;
  recipeId?: number;
}

const ListCard: React.FC<ListCardProps> = ({
  title,
  image,
  onPress,
  isBookmarked,
  onBookmarkPress,
  onSharePress,
  showShareIcon = true, 
  customStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, customStyle]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        {showShareIcon && onSharePress && (
          <TouchableOpacity
            style={styles.shareIconContainer}
            onPress={onSharePress}
          >
            <Image
              source={require("../../../assets/icons/upload.png")}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.iconContainer}>
          <BookmarkIcon isBookmarked={isBookmarked} onPress={onBookmarkPress} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListCard;
