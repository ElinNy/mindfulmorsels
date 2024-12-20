import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { collection, doc, setDoc, deleteDoc, getDocs, query, orderBy, limit, startAfter, DocumentSnapshot } from "firebase/firestore";

export const useBookmarks = () => {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) return;

      const bookmarksCollection = collection(db, "users", user.uid, "bookmarks");
      const q = query(bookmarksCollection, orderBy("title"), limit(10));
      const snapshot = await getDocs(q);

      setBookmarkedRecipes(snapshot.docs.map((doc) => ({ recipeId: doc.id, ...doc.data() })));
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreBookmarks = async () => {
    if (loadingMore || !lastDoc) return;

    try {
      setLoadingMore(true);
      const user = auth.currentUser;
      if (!user) return;

      const bookmarksCollection = collection(db, "users", user.uid, "bookmarks");
      const q = query(bookmarksCollection, orderBy("title"), startAfter(lastDoc), limit(10));
      const snapshot = await getDocs(q);

      setBookmarkedRecipes((prev) => [...prev, ...snapshot.docs.map((doc) => ({ recipeId: doc.id, ...doc.data() }))]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    } catch (error) {
      console.error("Error fetching more bookmarks:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const toggleBookmark = async (recipe: any) => {
    const user = auth.currentUser;
    if (!user) return;

    const bookmarkRef = doc(db, "users", user.uid, "bookmarks", recipe.recipeId.toString());
    const isBookmarked = bookmarkedRecipes.some((item) => item.recipeId === recipe.recipeId);

    try {
      if (isBookmarked) {
        await deleteDoc(bookmarkRef);
      } else {
        const newBookmark = {
          recipeId: recipe.recipeId.toString(),
          title: recipe.title,
          image: recipe.image,
        };
        await setDoc(bookmarkRef, newBookmark);
      }
      fetchBookmarks();
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return { bookmarkedRecipes, toggleBookmark, fetchBookmarks, fetchMoreBookmarks, loading, loadingMore };
};
