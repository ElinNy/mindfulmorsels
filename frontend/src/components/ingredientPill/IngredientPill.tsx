import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./IngredientPillStyle";

interface IngredientPillsProps {
  ingredients: string[];
  onRemoveIngredient: (ingredient: string) => void;
}

const IngredientPills: React.FC<IngredientPillsProps> = ({
  ingredients,
  onRemoveIngredient,
}) => {
  return (
    <View style={styles.pillContainer}>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.pill}>
          <Text style={styles.pillText}>{ingredient}</Text>
          <TouchableOpacity
            onPress={() => onRemoveIngredient(ingredient)}
            style={styles.pillCloseButton}
          >
            <Text style={styles.pillCloseButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default IngredientPills;
