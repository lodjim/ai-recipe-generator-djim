import { type FormEvent, useState } from "react";
import { Loader } from "@aws-amplify/ui-react";
import "./App.css";
import { useAIGeneration } from "./client";
import "@aws-amplify/ui-react/styles.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [{ data, isLoading }, generateRecipe] = useAIGeneration("generateRecipe");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!inputValue.trim()) return;
    
    await generateRecipe({
      description: inputValue,
    });
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <h1 className="main-header">
          Meet Your Personal{" "}
          <span className="highlight">Recipe AI</span>
        </h1>
        <p className="description">
          Simply type a few ingredients using the format ingredient1,
          ingredient2, etc., and Recipe AI will generate an all-new recipe on
          demand...
        </p>
      </div>

      <form onSubmit={onSubmit} className="form-container">
        <div className="search-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ingredient1, Ingredient2, ..."
            required
            className="wide-input"
          />
          <button type="submit" className="search-button" disabled={isLoading}>
            Generate
          </button>
        </div>
      </form>

      <div className="result-container">
        {isLoading ? (
          <div className="loader-container">
            <Loader size="large" />
            <p>Loading...</p>
          </div>
        ) : (
          data && (
            <div className="result">
              <h2 style={{ marginTop: 0 }}>{data.name}</h2>
              <h3>Ingredients:</h3>
              <ul>
                {data.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h3>Instructions:</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{data.instructions}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;