import { useState } from "react";

export const usePreferences = () => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const togglePreference = (preference: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((p) => p !== preference)
        : [...prev, preference]
    );
  };

  return { selectedPreferences, togglePreference };
};
