import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";

export const useBookmarks = () => {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<any[]>([]);

  useEffect(() => {
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

    fetchBookmarks();
  }, []);

  const toggleBookmark = async (recipe: any) => {
    const user = auth.currentUser;
    if (!user) return;

    const bookmarkRef = doc(db, "users", user.uid, "bookmarks", recipe.id.toString());

    const isBookmarked = bookmarkedRecipes.some((item) => item.recipeId === recipe.id);

    if (isBookmarked) {
      await deleteDoc(bookmarkRef);
      setBookmarkedRecipes((prev) => prev.filter((item) => item.recipeId !== recipe.id));
    } else {
      const newBookmark = {
        recipeId: recipe.id,
        title: recipe.title,
        image: recipe.image,
      };
      await setDoc(bookmarkRef, newBookmark);
      setBookmarkedRecipes((prev) => [...prev, newBookmark]);
    }
  };

  return { bookmarkedRecipes, toggleBookmark };
};
