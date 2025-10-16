import { useState } from "react";
import "./Search.css";

const Search = ({ setCity }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setCity(inputValue.trim());
      setInputValue("");
    }
  };
  //////////////////////////////////////////
  const [suggestions, setSuggestions] = useState([]);
  const apiKey = "b08086aa6bd249c1a5a201952250910";

  // Buscar ciudades mientras el usuario escribe
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }
    if (value === "") {
      setSuggestions([]);
      setInputValue("");
      return;
    }

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${value}`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  // Al hacer clic en una sugerencia
  const handleSelectCity = (cityName) => {
    setInputValue(cityName);
    setCity(cityName);
    setSuggestions([]);
  };
  //////////////////////////////////////////
  return (
    <div className="input-container">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Busca una ciudad..."
          id="city"
          autoComplete="off"
        />

        <button type="submit">Buscar</button>

        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((city) => (
              <li
                className="suggestion-item"
                key={city.id}
                onClick={() =>
                  handleSelectCity(
                    `${city.name}, ${city.region}, ${city.country}`
                  )
                }
              >
                {city.name}, {city.region}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default Search;
