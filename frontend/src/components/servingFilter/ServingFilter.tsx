import React, { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./ServingFilterStyle";
import Slider from "@react-native-community/slider";

interface ServingFilterProps {
  onChange: (servings: number) => void;
}

const ServingFilter: React.FC<ServingFilterProps> = ({ onChange }) => {
  const [servings, setServings] = useState<number>(4);

  const handleValueChange = (value: number) => {
    setServings(value);
    onChange(value);
  };

  return (
    <View style={styles.servingFilterContainer}>
      <Text style={styles.servingFilterLabel}>{`Servings: ${servings}`}</Text>

      <Slider
        style={styles.servingSlider}
        minimumValue={2}
        maximumValue={8}
        step={2}
        value={servings}
        onValueChange={handleValueChange}
        minimumTrackTintColor="#FF6F61"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#FF6F61"
      />
    </View>
  );
};

export default ServingFilter;
