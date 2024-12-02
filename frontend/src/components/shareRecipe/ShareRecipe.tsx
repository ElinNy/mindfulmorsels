import React from "react";
import { TouchableOpacity, Image, Alert } from "react-native";
import { shareRecipe } from "../../utils/firebaseUtils";

interface ShareRecipeProps {
  recipe: {
    recipeId: number;
    title: string;
    image: string;
  };
}

const ShareRecipe: React.FC<ShareRecipeProps> = ({ recipe }) => {
  const handleShare = async () => {
    try {
      await shareRecipe(recipe);
      Alert.alert("Success", "Recipe shared successfully!");
    } catch (error) {
      console.error("Error sharing recipe:", error);
      Alert.alert("Error", "Failed to share recipe. Please try again.");
    }
  };

  return (
    <TouchableOpacity onPress={handleShare}>
      <Image
        source={require("../../../assets/icons/upload.png")}
        style={{ width: 20, height: 20 }}
      />
    </TouchableOpacity>
  );
};

export default ShareRecipe;
