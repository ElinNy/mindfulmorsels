import { onAuthStateChanged, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebase/firebaseConfig";

// Logga ut användaren om 7 dagar har gått
export async function checkSession() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const loginTime = await AsyncStorage.getItem("loginTime");
        const currentTime = new Date().getTime();

        if (loginTime) {
          const diff = currentTime - parseInt(loginTime, 10);
          const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

          if (diff > sevenDaysInMs) {
            await signOut(auth);
            await AsyncStorage.removeItem("loginTime");
            alert("Session expired. Please log in again.");
          }
        } else {
          await AsyncStorage.setItem("loginTime", currentTime.toString());
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    }
  });
}
