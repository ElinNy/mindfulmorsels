import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import Checkbox from "expo-checkbox";
import { styles } from "./DietaryPreferenceDropdownStyle";

interface DietaryPreference {
  id: string;
  label: string;
}

interface Props {
  preferences: DietaryPreference[];
  selectedPreferences: string[];
  onTogglePreference: (preference: string) => void;
}

const DietaryPreferenceDropdown: React.FC<Props> = ({
  preferences,
  selectedPreferences,
  onTogglePreference,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleTogglePreference = (preference: string) => {
    onTogglePreference(preference);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
        <Text style={styles.dropdownHeaderText}>Dietary Options</Text>
        <Image
          source={
            isOpen
              ? require("../../../assets/icons/arrow-up.png")
              : require("../../../assets/icons/down.png")
          }
          style={styles.arrowIcon}
        />
      </TouchableOpacity>

      {isOpen && (
        <FlatList
          data={preferences}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.preferenceItem}>
              <Checkbox
                value={selectedPreferences.includes(item.id)}
                onValueChange={() => handleTogglePreference(item.id)}
                color={selectedPreferences.includes(item.id) ? "#3DA510" : undefined}
              />
              <Text style={styles.preferenceText}>{item.label}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default DietaryPreferenceDropdown;
