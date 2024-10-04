import "./index.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from "react";
import HomePage from "./pages/homePage";
import SearchPage from "./pages/searchPage";
import RecipeDetails from "./pages/recipeDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/recipe/:name" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
