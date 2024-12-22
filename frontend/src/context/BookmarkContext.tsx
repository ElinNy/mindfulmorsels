import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { collection, doc, setDoc, deleteDoc, getDocs, query, orderBy, Timestamp } from "firebase/firestore";

export interface BookmarkContextProps {
  bookmarkedRecipes: any[];
  toggleBookmark: (recipe: any) => Promise<void>;
  loading: boolean;
}

export interface BookmarkProviderProps {
  children: ReactNode;
}

export const BookmarkContext = createContext<BookmarkContextProps | undefined>(undefined);

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({ children }) => {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        console.error("User not logged in. Cannot fetch bookmarks.");
        return;
      }

      const bookmarksCollection = collection(db, "users", user.uid, "bookmarks");
      const snapshot = await getDocs(query(bookmarksCollection, orderBy("title")));
      const bookmarks = snapshot.docs.map((doc) => ({
        recipeId: doc.id,
        ...doc.data(),
      }));
      setBookmarkedRecipes(bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async (recipe: any) => {
    const user = auth.currentUser;
    if (!user) return;

    const recipeId = String(recipe.id || recipe.recipeId);
    const bookmarkRef = doc(db, "users", user.uid, "bookmarks", recipeId);
    const isBookmarked = bookmarkedRecipes.some((item) => String(item.recipeId) === recipeId);

    try {
      if (isBookmarked) {
        await deleteDoc(bookmarkRef);
      } else {
        const newBookmark = {
          recipeId,
          title: recipe.title,
          image: recipe.image,
          createdAt: Timestamp.fromDate(new Date()),
        };
        await setDoc(bookmarkRef, newBookmark);
      }
      await fetchBookmarks();
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <BookmarkContext.Provider value={{ bookmarkedRecipes, toggleBookmark, loading }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};
