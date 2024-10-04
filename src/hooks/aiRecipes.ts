import { useState,useEffect } from 'react';
import {GoogleGenerativeAI} from "@google/generative-ai";

const ai = process.env.REACT_APP_GEMINI_API_KEY as string;

export const useAihRecipes = (initialQuery: string = '') => {
  const [loading, setLoading] = useState(false); 
  const [recipes, setRecipes] = useState<any[]>([]); 
  const [currentRecipes, setCurrentRecipes] = useState<any[]>([]); 
  const [query, setQuery] = useState(initialQuery); 


  const gemini = new GoogleGenerativeAI(ai);
  useEffect(() => {
    if (query) {
      fetchRecipes(query);
    }
  }, [query]);

  const fetchRecipes = async (query: string) => {
    setLoading(true);
    
    const model = gemini.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Give me a list of 5 recipes based on: ${query}. Provide only the name and preparation time for each recipe without any numbering or bullet points, formatted as "Name, Time".`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const recipeData = response.text();

      if (recipeData) {
        const parsedRecipes = parseRecipeData(recipeData);
        setRecipes(parsedRecipes);
        setCurrentRecipes(parsedRecipes.slice(0, 5)); 
      } else {
        console.error("No recipes found in the response.");
      }
   
      setLoading(false);
  };

  const fetchRecipeDetails = async (recipeName: string) => {
    setLoading(true);
    const model = gemini.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Provide detailed information for the recipe named "${recipeName}". Include the following: 
    - A bulleted list of ingredients( without *)
    - A numbered list of instructions (e.g., 1. Step one, 2. Step two)
    - Total preparation time (just the  minutes).`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const recipeDetails = response.text();
       
        return parseRecipeDetails(recipeDetails); 
    } catch (error) {
        console.error("Error fetching recipe details:", error);
    } finally {
        setLoading(false);
    }
};

 
  const parseRecipeData = (data: string) => {
    return data
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((recipe) => {
        const [name, time] = recipe.split(",").map(part => part.trim());
        const cleanedName = name.replace(/^\d+\.\s*/, '');
        
        return {
          id: Math.random(),
          name: cleanedName.trim(),
          time: time.trim() || "Unknown time", 
        };
      });
  };

  const parseRecipeDetails = (data: string) => {
    const lines = data.split("\n");
    let ingredients: string[] = [];
    let instructions: string[] = [];
    let time = "Unknown time"; 

    lines.forEach(line => {
        
        if (line.startsWith("•") || line.includes("Ingredient:")||line.startsWith("-")) {
            const ingredient = line.trim();
            ingredients.push(ingredient);
        } 
       
        else if (/^\d+\./.test(line.trim())) {
            instructions.push(line.trim());
        } 
        else if (line.includes("Total Preparation Time:")) {
            time = line.replace("**Total Preparation Time:**", "").trim();
        }
    });

    return {
        ingredients,
        instructions,
        time,
    };
};

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleDislike = async () => {
    const dislikedRecipes = currentRecipes.map(recipe => recipe.name).join(", ");
    const newQuery = `Suggest more recipes that don't include: ${dislikedRecipes}, but  based on: ${query}`;
    await fetchRecipes(newQuery);
  };

  return {
    currentRecipes,
    recipes, 
    loading,
    handleSearch,
    handleDislike,
    query,
    fetchRecipeDetails,
  };
};

export default useAihRecipes;
