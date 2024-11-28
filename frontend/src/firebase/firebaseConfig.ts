import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importera Firestore
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const firebaseConfig = Constants.expoConfig?.extra?.firebase;

if (!firebaseConfig) {
  throw new Error(
    "Firebase configuration is missing in Constants.expoConfig.extra."
  );
}

// Initiera Firebase-appen
const app = initializeApp(firebaseConfig);

// Initiera Firebase Authentication med lokal persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initiera Firestore-databasen
const db = getFirestore(app);

export { auth, db };
