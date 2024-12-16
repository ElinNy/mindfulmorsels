export const nonVeganIngredients = [
    "fish",
    "salmon",
    "tuna",
    "shrimp",
    "crab",
    "lobster",
    "chicken",
    "beef",
    "pork",
    "egg",
    "milk",
    "cheese",
    "butter",
    "honey",
  ];
  
  export const nonGlutenFreeIngredients = [
    "wheat",
    "barley",
    "rye",
    "spelt",
    "pasta",
    "bread",
    "flour",
    "cake",
    "cookies",
    "cracker",
  ];
  
  export const nonDairyFreeIngredients = [
    "milk",
    "cheese",
    "butter",
    "cream",
    "heavy cream",
    "yogurt",
    "ice cream",
    "whey",
    "casein",
  ];
  
  export const filterDietaryPreference = (recipes: any[], preferences: string[]) => {
    return recipes.filter((recipe) => {
      const title = recipe.title.toLowerCase();
      const ingredients = recipe.missedIngredients?.map((ing: any) => ing.name.toLowerCase()) || [];
  
      // Kontroll för veganskt
      if (preferences.includes("vegan")) {
        if (nonVeganIngredients.some((nonVegan) => title.includes(nonVegan) || ingredients.includes(nonVegan))) {
          return false;
        }
      }
  
      // Kontroll för glutenfritt
      if (preferences.includes("glutenFree")) {
        if (nonGlutenFreeIngredients.some((nonGluten) => title.includes(nonGluten) || ingredients.includes(nonGluten))) {
          return false;
        }
      }
  
      // Kontroll för mjölkfritt
      if (preferences.includes("dairyFree")) {
        if (nonDairyFreeIngredients.some((nonDairy) => title.includes(nonDairy) || ingredients.includes(nonDairy))) {
          return false;
        }
      }
  
      return true;
    });
  };
  