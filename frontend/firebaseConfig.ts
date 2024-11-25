import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";

const firebaseConfig = Constants.expoConfig?.extra?.firebase;

if (!firebaseConfig) {
  throw new Error(
    "Firebase-konfiguration saknas i Constants.expoConfig.extra."
  );
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
