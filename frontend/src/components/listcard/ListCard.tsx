import React from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { styles } from "./ListCardStyle";
import BookmarkIcon from "../bookmark/BookmarkIcon";
import ShareRecipe from "../shareRecipe/ShareRecipe";

interface ListCardProps {
  title: string;
  image: string;
  recipeId: number;
  onPress: () => void;
  isBookmarked: boolean;
  onBookmarkPress: () => void;
  onSharePress?: () => void; 
  showShareIcon?: boolean; 
}

const ListCard: React.FC<ListCardProps> = ({
  title,
  image,
  recipeId,
  onPress,
  isBookmarked,
  onBookmarkPress,
  onSharePress = true,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        {onSharePress && (
          <View style={styles.shareIconContainer}>
            <ShareRecipe recipe={{ recipeId, title, image }} />
          </View>
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
