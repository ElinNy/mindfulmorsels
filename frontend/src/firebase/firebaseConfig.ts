import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

const firebaseConfig = Constants.expoConfig?.extra?.firebase;

if (!firebaseConfig) {
  throw new Error(
    "Firebase configuration is missing in Constants.expoConfig.extra."
  );
}

// Initiera Firebase-appen
const app = initializeApp(firebaseConfig);

// Initiera Firebase Authentication
const auth = getAuth(app);

// Initiera Firestore-databasen
const db = getFirestore(app);

export { auth, db };
