import React, { useState } from "react";
import "./index.css";
import "isomorphic-fetch";
const api = {
  base: "https://api.openweathermap.org/data/2.5/"
};


// We start by setting useState for the query and weather calls used when we fetch the openweathermap api.
// We get the result in JSON and use promises to get the result we need.
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  // We create a const to show the current date, month and year.
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  // We return all the info we are targeting, ie. weather, temp and location.
  // Our bg is determined by whether the weather is < than or > 16 degrees celsius.
  // On input the search function we created above is called and the weather name, temp and location is populated into these divs
  // Lastly we use the dateBuilder funciton to populate the date div.
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>  
            </div>
            <div className="location-box">
            <div className="weather">{weather.weather[0].main}</div>
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
