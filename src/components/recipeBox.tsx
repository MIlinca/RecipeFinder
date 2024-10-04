import {useNavigate } from "react-router-dom";
interface RecipeBox{
    name: string,
    time: string,
    favorite:boolean,
    favoriteButton:()=>void
}

const RecipeBox:React.FC<RecipeBox> =({name, time, favorite,favoriteButton}) =>{
  const navigate = useNavigate();

  const handleNameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/recipe/${encodeURIComponent(name)}`);
};

return (
  <div className="flex items-center justify-between border rounded-lg p-4 w-full max-w-sm mb-4 bg-white shadow-md">
      <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"></div>
          <div>
              <h3
                  onClick={handleNameClick}
                  className="text-lg font-semibold cursor-pointer"
              >
                  {name}
              </h3>
              <p>{time}</p>
          </div>
      </div>
      <button onClick={favoriteButton} className="focus:outline-none">
          {favorite ? "💜" : "🤍"}
      </button>
  </div>
);
};
    export default RecipeBox;