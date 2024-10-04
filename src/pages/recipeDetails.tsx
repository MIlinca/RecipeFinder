import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAihRecipes } from "../hooks/aiRecipes";


const RecipeDetails: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const { fetchRecipeDetails } = useAihRecipes();
    const [recipeDetails, setRecipeDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        const fetchDetails = async () => {
            if (!name) {

                setLoading(false);
                return;
            }    
            setLoading(true);
           
            try {
                const details = await fetchRecipeDetails(name);
                if (details) {
                    setRecipeDetails(details);
                }
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchDetails();
    }, [name]); 
    

    if (loading) {
        return <p>Loading recipe details...</p>;
    }

    if (!recipeDetails) {
        return <p>Recipe details not found.</p>;
    }
    
    return (
        <div className="container mx-auto p-4">
            <div className="flex">
                <div className="w-1/2 p-4  mr-2 rounded-lg">
                    <h1 className="text-3xl font-bold">{name}</h1>
                    <p className="text-lg">Preparation Time: {recipeDetails.time || "Unknown time"}</p>
                </div>

                <div className="w-1/2 p-4  ml-2 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                    <ul className="list ml-5">
                        {recipeDetails.ingredients.map((ingredient: string, index: number) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h2 className="text-xl font-semibold mb-2 mt-4">Instructions</h2>
                    <ol className="list ml-5">
                        {recipeDetails.instructions.map((instruction: string, index: number) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
