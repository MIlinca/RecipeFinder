import { useState} from "react";

export const useFavorites = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<any[]>(() => {
    const savedFavorites = localStorage.getItem("favoriteRecipes");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const addFavorite = (recipe: any) => {
    if (!favoriteRecipes.some(fav => fav.name === recipe.name)) {
      const updatedFavorites = [...favoriteRecipes, recipe];
      setFavoriteRecipes(updatedFavorites);
      localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
    }
    
  };

  const removeFavorite = (recipe: any) => {
    const updatedFavorites = favoriteRecipes.filter(fav => fav.name !== recipe.name);
    setFavoriteRecipes(updatedFavorites);
    localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
  };

  return {
    favoriteRecipes,
    addFavorite,
    removeFavorite,
  };
};
