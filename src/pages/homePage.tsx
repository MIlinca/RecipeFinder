
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/recipesList";
import { useFavorites } from "../hooks/useFavorites";

const HomePage: React.FC = () => {
  const navigate = useNavigate(); 
  const { favoriteRecipes, addFavorite, removeFavorite } = useFavorites(); 

  const handleSearch = (query: string) => {
    navigate(`/search?query=${query}`); 
  };

  const handleFavorite = (index: number) => {
    const recipeToToggle = favoriteRecipes[index];
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

      <h1 className="flex flex-wrap text-3xl font-bold w-full max-w-lg mx-auto mt-10">Favorites</h1>
      {favoriteRecipes.length > 0 ? (
        <RecipeList 
        recipes={favoriteRecipes} 
        favorite={handleFavorite} 
        favoriteList={favoriteRecipes.map((fav) => fav.name)} 
      />
      ) : (
        <p className="text-center mt-4">No favorite recipes yet!</p>
      )}
    </div>
  );
};
export default HomePage;