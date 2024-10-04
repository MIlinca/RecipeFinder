import RecipeBox from "./recipeBox";

interface Recipe {
  name: string;
  time: string;
}

interface List {
  recipes: Recipe[];
  favorite: (index: number) => void;
  favoriteList: string[];
}

const RecipeList: React.FC<List> = ({recipes, favorite, favoriteList }) => {
  return (
    <div className="flex flex-wrap justify-center w-full max-w-lg mx-auto mt-4">
      {recipes.map((recipe, index) => (
        <RecipeBox
          key={index}
          name={recipe.name}
          time={recipe.time}
          favorite={favoriteList.includes(recipe.name)}
          favoriteButton={() => favorite(index)}
        />
      ))}
    </div>
  );
};

export default RecipeList;