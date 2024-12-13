import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";

export const useBookmarks = () => {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<any[]>([]);

  const fetchBookmarks = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const bookmarksCollection = collection(db, "users", user.uid, "bookmarks");
      const snapshot = await getDocs(bookmarksCollection);
      const recipes = snapshot.docs.map((doc) => doc.data());
      setBookmarkedRecipes(recipes);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const toggleBookmark = async (recipe: any) => {
    const user = auth.currentUser;
    if (!user) return;
  
    const bookmarkRef = doc(db, "users", user.uid, "bookmarks", recipe.recipeId.toString());
  
    const isBookmarked = bookmarkedRecipes.some((item) => item.recipeId === recipe.recipeId);
  
    if (isBookmarked) {
      await deleteDoc(bookmarkRef);
      await fetchBookmarks();
    } else {
      const newBookmark = {
        recipeId: recipe.recipeId.toString(),
        title: recipe.title,
        image: recipe.image,
      };
      await setDoc(bookmarkRef, newBookmark);
      await fetchBookmarks();
    }
  };
  
  return { bookmarkedRecipes, toggleBookmark, fetchBookmarks };
};
