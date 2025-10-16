import "../weatherCard/WeatherCard.css";
import { useRef, useState } from "react";
import flags from "../../assets/Flags/country-by-flag.json";
import { Map, Marker } from "pigeon-maps";

const WeatherCard = ({ weather, temp }) => {
  const [isCelsius, setisCelsius] = useState(true);

  // cambiar entre °C y °F
  const changeTemp = () => {
    setisCelsius(!isCelsius);
  };

  //   obtener horas del pronostico actual
  const forecastday = weather?.forecast.forecastday[0].hour;

  //  obtener pronostico por 10 dias
  const forecast10days = weather?.forecast.forecastday;

  //   botones del carousel
  const carouselRef = useRef(null);
  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  //////////
  // ELEGIR BANDERA SEGÚN PAÍS
  const country = flags.find((i) => i.name === weather?.location.country);
  const countryFlag = `https://flagcdn.com/${country?.code}.svg`;
  //////////////////////////
  const positionMap = [weather?.location.lat, weather?.location.lon];
  // TILES MAP
  const localTime = weather?.location?.localtime;
  const date = new Date(localTime.replace(" ", "T"));

  // Obtenemos la hora en UTC
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    hour12: false,
  });

  const dateUTC = `${yyyy}${mm}${dd}`;
  const hourUTC = `${hh}`;

  const weatherTile = (x, y, z) => {
    const urlTile = `https://weathermaps.weatherapi.com/tmp2m/tiles/${dateUTC}${hourUTC}/${z}/${x}/${y}.png`;
    return urlTile;
  };

  return (
    <section className="weatherSection">
      <div className="weather-container-cards">
        <article className="weatherCard">
          <div className="temp-details">
            <div className="location">
              <span className="location-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" />
                </svg>
              </span>

              <p className="location-name">
                {weather?.location.name},{" "}
                <span>{weather?.location.region}</span>
              </p>

              <span className="location-flag">
                <img src={countryFlag} alt={weather?.location.country} />
              </span>
            </div>
            <p className="weather__time">
              {new Date(weather?.location.localtime).toLocaleString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <div className="weather__value">
              <div className="weather__temp-container">
                <h2 className="weather__temp">
                  {isCelsius
                    ? `${Math.trunc(temp?.celsius)} °C`
                    : `${Math.trunc(temp?.fahrenheit)}  °F`}
                </h2>
                <img
                  src={weather?.current.condition.icon}
                  alt={weather?.current.condition.text}
                  className={weather?.current.is_day === 1 ? "day" : "night"}
                />
              </div>
              <p className="weather__text">{weather?.current.condition.text}</p>
            </div>

            <div className="btn__container">
              <button className="buttonTemp" onClick={changeTemp}>
                Cambiar a °{isCelsius ? "F" : "C"}
              </button>
            </div>
          </div>
        </article>
      </div>

      <div className="Codicitions__temp">
        <h3 className="conditions-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3.5 5.5l1.5 1.5l2.5 -2.5" />
            <path d="M3.5 11.5l1.5 1.5l2.5 -2.5" />
            <path d="M3.5 17.5l1.5 1.5l2.5 -2.5" />
            <path d="M11 6l9 0" />
            <path d="M11 12l9 0" />
            <path d="M11 18l9 0" />
          </svg>
          Condiciones actuales
        </h3>
        <ul className="weather-list">
          <li className="weather-item">
            <span className="weather-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" />
                <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" />
                <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
              </svg>
            </span>
            <span className="weather-name">Viento</span>
            <span className="weather-value">
              {weather?.current.wind_kph} km/h
            </span>
          </li>
          <li className="weather-item">
            <span className="weather-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10.04 4.305c2.195 -.667 4.615 -.224 6.36 1.176c1.386 1.108 2.188 2.686 2.252 4.34l.003 .212l.091 .003c2.3 .107 4.143 1.961 4.25 4.27l.004 .211c0 2.407 -1.885 4.372 -4.255 4.482l-.21 .005h-11.878l-.222 -.008c-2.94 -.11 -5.317 -2.399 -5.43 -5.263l-.005 -.216c0 -2.747 2.08 -5.01 4.784 -5.417l.114 -.016l.07 -.181c.663 -1.62 2.056 -2.906 3.829 -3.518l.244 -.08z" />
              </svg>
            </span>
            <span className="weather-name">Nubes</span>
            <span className="weather-value">{weather?.current.cloud} %</span>
          </li>
          <li className="weather-item">
            <span className="weather-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 12.003c.541 0 1.045 .273 1.342 .727l2.122 3.273a3.999 3.999 0 0 1 -6.035 5.063c-1.487 -1.248 -1.864 -3.382 -.867 -5.11l2.098 -3.226a1.6 1.6 0 0 1 1.34 -.727" />
                <path d="M18 12.003c.541 0 1.045 .273 1.342 .727l2.122 3.273a3.999 3.999 0 0 1 -6.035 5.063c-1.487 -1.248 -1.864 -3.382 -.867 -5.11l2.098 -3.227a1.6 1.6 0 0 1 1.34 -.726" />
                <path d="M12 2.003c.541 0 1.045 .273 1.342 .727l2.122 3.273a3.999 3.999 0 0 1 -6.035 5.063c-1.487 -1.248 -1.864 -3.382 -.867 -5.11l2.098 -3.226a1.6 1.6 0 0 1 1.34 -.727" />
              </svg>
            </span>
            <span className="weather-name">Humedad</span>
            <span className="weather-value">{weather?.current.humidity} %</span>
          </li>
          <li className="weather-item">
            <span className="weather-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 19.875c0 .621 -.512 1.125 -1.143 1.125h-5.714a1.134 1.134 0 0 1 -1.143 -1.125v-15.875a1 1 0 0 1 1 -1h5.857c.631 0 1.143 .504 1.143 1.125z" />
                <path d="M12 9h-2" />
                <path d="M12 6h-3" />
                <path d="M12 12h-3" />
                <path d="M12 18h-3" />
                <path d="M12 15h-2" />
                <path d="M21 3h-4" />
                <path d="M19 3v18" />
                <path d="M21 21h-4" />
              </svg>
            </span>
            <span className="weather-name">Presión</span>
            <span className="weather-value">
              {weather?.current.pressure_mb} hPa
            </span>
          </li>
        </ul>
      </div>

      <div className="weather-map-container">
        <h3>Ubicación en el mapa</h3>
        <div className="weather-map">
          {positionMap && (
            <Map
              center={positionMap}
              key={positionMap}
              // provider={weatherTile}
              minZoom={2}
              maxZoom={14}
              defaultZoom={12}
              className="map"
            >
              <Marker color="#6047e9" width={40} anchor={positionMap} />
            </Map>
          )}
        </div>
      </div>

      <div className="hour-container">
        <h3 className="hour-container-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M12 7v5l3 3" />
          </svg>{" "}
          Pronostico por horas
        </h3>
        <button className="scroll-btn left" onClick={scrollLeft}>
          ‹
        </button>
        <div className="hourly-container" ref={carouselRef}>
          {forecastday?.map((hour, index) => (
            <article key={index} className="hour-card">
              <p className="hour-time">{hour.time.split(" ")[1]}</p>
              <img
                src={hour.condition.icon}
                alt={hour.condition.text}
                className={hour.is_day === 1 ? "day" : "night"}
              />

              <p className="hour-temp">
                {isCelsius
                  ? `${Math.trunc(hour?.temp_c)} °C`
                  : `${Math.trunc(hour?.temp_f)}  °F`}
              </p>
              {/* <p className="hour-text">{hour.condition.text}</p> */}
            </article>
          ))}
        </div>
        <button className="scroll-btn right" onClick={scrollRight}>
          ›
        </button>
      </div>

      <div className="day-container">
        <h3 className="hour-container-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M16 2c.183 0 .355 .05 .502 .135l.033 .02c.28 .177 .465 .49 .465 .845v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 .514 -.874l.093 -.046l.066 -.025l.1 -.029l.107 -.019l.12 -.007q .083 0 .161 .013l.122 .029l.04 .012l.06 .023c.328 .135 .568 .44 .61 .806l.007 .117v1h6v-1a1 1 0 0 1 1 -1m3 7h-14v9.625c0 .705 .386 1.286 .883 1.366l.117 .009h12c.513 0 .936 -.53 .993 -1.215l.007 -.16z" />
            <path d="M9.015 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
            <path d="M13.015 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
            <path d="M17.02 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
            <path d="M12.02 15a1 1 0 0 1 0 2a1.001 1.001 0 1 1 -.005 -2z" />
            <path d="M9.015 16a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1" />
          </svg>{" "}
          Pronostico por 10 días
        </h3>
        <div className="dayly-container">
          {forecast10days?.map((day, idx) => (
            <article key={idx} className="day-card">
              <p className="day-date">
                {new Date(day.date).toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>

              <div className="avg-humidity">
                <p className="day-humidity">{day.day.avghumidity} %</p>
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                />
              </div>

              <div className="tempTeam">
                <p className="day-min">
                  {isCelsius
                    ? `${Math.trunc(forecast10days?.[idx].day.mintemp_c)} °C`
                    : `${Math.trunc(forecast10days?.[idx].day.mintemp_f)}  °F`}
                </p>
                /
                <p className="day-max">
                  {" "}
                  {isCelsius
                    ? `${Math.trunc(forecast10days?.[idx].day.maxtemp_c)} °C`
                    : `${Math.trunc(forecast10days?.[idx].day.maxtemp_f)}  °F`}
                </p>{" "}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="atributions">
        <p>Powered by:</p>

        <a
          href="https://www.weatherapi.com/"
          title="Free Weather API"
          target="blank"
        >
          <img
            src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
            alt="Weather data by WeatherAPI.com"
          />
        </a>
      </div>
    </section>
  );
};

export default WeatherCard;
