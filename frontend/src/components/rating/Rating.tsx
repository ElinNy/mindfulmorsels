import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { db, auth } from "../../firebase/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import {styles} from "./RatingStyle";

interface RatingProps {
  recipeId: number;
}

const Rating: React.FC<RatingProps> = ({ recipeId }) => {
  const [likes, setLikes] = useState<number>(0);
  const [userLiked, setUserLiked] = useState<boolean>(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const recipeRef = doc(db, "sharedRecipes", recipeId.toString());
        const recipeSnap = await getDoc(recipeRef);

        if (recipeSnap.exists()) {
          setLikes(recipeSnap.data().likes || 0);
        }

        const user = auth.currentUser;
        if (!user) return;

        const userLikeRef = doc(db, "sharedRecipes", recipeId.toString(), "likes", user.uid);
        const userLikeSnap = await getDoc(userLikeRef);

        if (userLikeSnap.exists()) {
          setUserLiked(true);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [recipeId]);

  const handleLike = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("Användaren är inte inloggad.");
      }

      const recipeRef = doc(db, "sharedRecipes", recipeId.toString());
      const userLikeRef = doc(db, "sharedRecipes", recipeId.toString(), "likes", user.uid);

      if (userLiked) {
        await updateDoc(recipeRef, {
          likes: increment(-1),
        });
        await deleteDoc(userLikeRef);
        setLikes((prev) => prev - 1);
        setUserLiked(false);
      } else {
        await updateDoc(recipeRef, {
          likes: increment(1),
        });
        await setDoc(userLikeRef, {
          likedAt: new Date(),
        });
        setLikes((prev) => prev + 1);
        setUserLiked(true);
      }
    } catch (error) {
      console.error("Error liking/unliking recipe:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.ratingContainer} onPress={handleLike}>
      <Image
        source={
          userLiked
            ? require("../../../assets/icons/star.png")
            : require("../../../assets/icons/starOutlined.png")
        }
        style={styles.starIcon}
      />
      <Text style={styles.likesText}>{likes}</Text>
    </TouchableOpacity>
  );
};

export default Rating;
