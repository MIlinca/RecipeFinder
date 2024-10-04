
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/recipesList";
import {useAihRecipes } from "../hooks/aiRecipes";
import { useLocation } from "react-router-dom";
import React from "react";
import { useFavorites } from "../hooks/useFavorites";

const SearchPage: React.FC = () => {
    const { search } = useLocation(); 
    const query = new URLSearchParams(search).get("query") || "";
  
    const {
      currentRecipes,
      loading,
      handleSearch,
      handleDislike,
    } = useAihRecipes(query);
  
    const { addFavorite, removeFavorite, favoriteRecipes } = useFavorites();

    const handleFavorite = (index: number) => {
      const recipeToToggle = currentRecipes[index];
      const isFavorite = favoriteRecipes.some(fav => fav.name === recipeToToggle.name);
      
      if (isFavorite) {
        removeFavorite(recipeToToggle);
      } else {
        addFavorite(recipeToToggle);
      }
    };
  

    return (
      <div className="container mx-auto p-4">
        <SearchBar onSearch={handleSearch} />
  
        {loading ? (
          <p className="text-center mt-4">Loading recipes...</p>
        ) : (
          <>
          <h1 className="flex flex-wrap text-3xl font-bold w-full max-w-lg mx-auto mt-10">Suggested recipes</h1>
          <RecipeList 
            recipes={currentRecipes} 
            favorite={handleFavorite} 
            favoriteList={favoriteRecipes.map((fav) => fav.name)} 
          />
            <div className="text-center mt-4">
              <button 
                className="bg-purple-900 text-white py-2 px-4 rounded"
                onClick={handleDislike}
              >
                I don't like these
              </button>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default SearchPage;