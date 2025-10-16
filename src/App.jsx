import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./components/weatherCard/WeatherCard";
import Search from "./components/Search/Search";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setweather] = useState();
  const [city, setCity] = useState("");
  const [tempSelect, settempSelect] = useState({
    celsius: "",
    fahrenheit: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const succes = (info) => {
    setCoords({
      lat: info.coords.latitude,
      lon: info.coords.longitude,
      lang: navigator.language.split("-")[0],
    });
  };

  useEffect(() => {
    navigator.geolocation.watchPosition(succes);
  }, []);

  useEffect(() => {
    if (coords) {
      const apiKey = "b08086aa6bd249c1a5a201952250910";
      const url =
        city === ""
          ? `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${coords.lat},${coords.lon}&days=10&lang=es`
          : `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=10&lang=es`;

      axios
        .get(url)
        .then((res) => {
          setweather(res.data);
          settempSelect({
            celsius: res.data.current.temp_c,
            fahrenheit: res.data.current.temp_f,
          });
        })
        .catch((res) => console.log(res.err))
        .finally(() => setIsLoading(false));
    }
  }, [coords, city]);

  return (
    <div className="App">
      <Header setCity={setCity} />
      {isLoading ? (
        <Loader />
      ) : (
        <main className="main-container">
          <Search setCity={setCity} />
          <WeatherCard weather={weather} temp={tempSelect} />
        </main>
      )}
    </div>
  );
}

export default App;
