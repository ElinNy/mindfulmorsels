import { db, auth } from "../firebase/firebaseConfig";
import { doc, setDoc, deleteDoc, getDoc, Timestamp } from "firebase/firestore";
import { Bookmark } from "../types/types";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkSession = async (): Promise<void> => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const loginTime = await AsyncStorage.getItem("loginTime");
        const currentTime = Date.now();

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
};

/**
 * Lägger till ett recept som bokmärke för den aktuella användaren.
 * @param recipe 
 */

export const addBookmark = async (recipe: any): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Användaren är inte inloggad.");
  }

  const bookmarkRef = doc(db, "users", user.uid, "bookmarks", recipe.id.toString());

  const bookmark: Bookmark = {
    recipeId: recipe.id,
    title: recipe.title,
    image: recipe.image,
    createdAt: Timestamp.fromDate(new Date()),
  };

  await setDoc(bookmarkRef, bookmark);
};

/**
 * Tar bort ett recept från användarens bokmärken.
 * @param recipeId 
 */
export const removeBookmark = async (recipeId: number): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Användaren är inte inloggad.");
  }

  const bookmarkRef = doc(db, "users", user.uid, "bookmarks", recipeId.toString());
  await deleteDoc(bookmarkRef);
};

/**
 * Kontrollerar om ett recept är bokmärkt av den aktuella användaren.
 * @param recipeId 
 * @returns Booleskt värde som indikerar om receptet är bokmärkt.
 */
export const isBookmarked = async (recipeId: number): Promise<boolean> => {
  const user = auth.currentUser;
  if (!user) {
    return false;
  }

  const bookmarkRef = doc(db, "users", user.uid, "bookmarks", recipeId.toString());
  const docSnap = await getDoc(bookmarkRef);
  return docSnap.exists();
};



export const shareRecipe = async (recipe: any): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const sharedRecipeRef = doc(db, "sharedRecipes", recipe.recipeId.toString());
    await setDoc(sharedRecipeRef, {
      title: recipe.title,
      image: recipe.image,
      sharedBy: user.uid,
      timestamp: Timestamp.fromDate(new Date()),
    });
    console.log("Recipe shared successfully!");
  } catch (error) {
    console.error("Error sharing recipe:", error);
    throw error;
  }
};
