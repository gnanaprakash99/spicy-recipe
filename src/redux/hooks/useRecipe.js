import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setRecipeItems } from "../slices/RecipeSlice";

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s="; 

const fetchRecipes = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }
  return response.json();
};

const useRecipeItems = () => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["recipeItems"],
    queryFn: async () => {
      const data = await fetchRecipes();
      dispatch(setRecipeItems(data.meals)); 
      return data.meals;
    },
  });
};

export default useRecipeItems;
