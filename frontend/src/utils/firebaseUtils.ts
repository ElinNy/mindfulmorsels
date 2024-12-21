import { db, auth } from "../firebase/firebaseConfig";
import { doc, setDoc, deleteDoc, getDoc, Timestamp, collection, getDocs, DocumentSnapshot, query, orderBy, limit, startAfter } from "firebase/firestore";
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

/**
 * Lägger till ett recept som gillat för den aktuella användaren.
 * @param recipe - Receptobjektet som ska gillas.
 * @param rating - Betyg som ges till receptet (t.ex., 1-5).
 */
export const addLikedRecipe = async (recipe: any, rating: number): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Användaren är inte inloggad.");
  }

  const likedRecipeRef = doc(db, "likedRecipes", user.uid, "recipes", recipe.id.toString());

  const likedRecipe = {
    title: recipe.title,
    image: recipe.image,
    likedAt: Timestamp.fromDate(new Date()),
    rating: rating,
  };

  try {
    await setDoc(likedRecipeRef, likedRecipe);
    console.log("Recipe liked successfully!");
  } catch (error) {
    console.error("Error liking recipe:", error);
    throw error;
  }
};

/**
 * Tar bort ett recept från användarens gillade recept.
 * @param recipeId - ID för receptet som ska tas bort.
 */
export const removeLikedRecipe = async (recipeId: number): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Användaren är inte inloggad.");
  }

  const likedRecipeRef = doc(db, "likedRecipes", user.uid, "recipes", recipeId.toString());

  try {
    await deleteDoc(likedRecipeRef);
    console.log("Recipe unliked successfully!");
  } catch (error) {
    console.error("Error unliking recipe:", error);
    throw error;
  }
};

/**
 * Hämtar alla gillade recept för den aktuella användaren.
 * @returns En lista med gillade recept.
 */
export const getLikedRecipes = async (): Promise<any[]> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Användaren är inte inloggad.");
  }

  try {
    const snapshot = await getDocs(collection(db, "likedRecipes", user.uid, "recipes"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching liked recipes:", error);
    throw error;
  }
};

/**
 * Hämtar en sida med delade recept från Firestore.
 * @param pageSize Antal recept per sida.
 * @param lastDoc Det sista dokumentet från föregående hämtning för paginering.
 * @returns En lista med delade recept och en referens till det sista dokumentet.
 */
export const fetchPaginatedSharedRecipes = async (
  pageSize: number,
  lastDoc: DocumentSnapshot | null = null
): Promise<{ recipes: any[]; lastVisible: DocumentSnapshot | null }> => {
  try {
    let q = query(collection(db, "sharedRecipes"), orderBy("timestamp", "desc"), limit(pageSize));

    if (lastDoc) {
      q = query(collection(db, "sharedRecipes"), orderBy("timestamp", "desc"), startAfter(lastDoc), limit(pageSize));
    }

    const snapshot = await getDocs(q);
    const recipes = snapshot.docs.map((doc) => ({ recipeId: Number(doc.id), ...doc.data() }));
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    return { recipes, lastVisible };
  } catch (error) {
    console.error("Error fetching paginated shared recipes:", error);
    throw error;
  }
};