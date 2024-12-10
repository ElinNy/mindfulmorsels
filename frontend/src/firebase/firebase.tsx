import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Constants from "expo-constants";

const firebaseConfig = Constants.expoConfig?.extra?.firebase;

if (!firebaseConfig) {
  throw new Error(
    "Firebase-konfiguration saknas i Constants.expoConfig.extra."
  );
}

export default function FirebaseRecipes() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      if (!firebaseConfig) {
        console.error("Firebase-konfiguration saknas.");
        return;
      }
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

      const querySnapshot = await getDocs(collection(db, "recipes"));
      const fetchedRecipes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error("Fel vid hämtning av recept:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Firebase Recipes</Text>
      {loading ? (
        <Text>Hämtar recept...</Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: item.image }}
              />
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 14, marginTop: 5 }}>Ingredienser:</Text>
              {item.ingredients &&
                item.ingredients.map((ingredient: string, index: number) => (
                  <Text key={index} style={{ marginLeft: 10 }}>
                    - {ingredient}
                  </Text>
                ))}
            </View>
          )}
        />
      )}
    </View>
  );
}
