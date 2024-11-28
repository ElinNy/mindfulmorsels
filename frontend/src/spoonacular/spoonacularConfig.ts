import Constants from "expo-constants";

const SPOONACULAR_BASE_URL = "https://api.spoonacular.com";

const SPOONACULAR_API_KEY =
  Constants.expoConfig?.extra?.spoonacularApi ||
  Constants.manifest?.extra?.spoonacularApi;


if (!SPOONACULAR_API_KEY) {
  throw new Error(
    "Spoonacular API key is missing. Add it to your app.config.ts or app.json."
  );
}

export { SPOONACULAR_BASE_URL, SPOONACULAR_API_KEY };
