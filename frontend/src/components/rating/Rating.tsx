import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { db, auth } from "../../firebase/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

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

      if (!userLiked) {
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
      console.error("Error liking recipe:", error);
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

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 10,
  },
  starIcon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  likesText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Rating;
