import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      
      const response = await axios.post(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=64f60853740a1ee3ba20d0fb595c97d5&units=metric`
      );
      setWeatherData(response.data);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setWeatherData(null);
      setError(
        error?.response?.data?.message ||
          "Error fetching data." + " Please try again."
      );
      setLoading(false);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="container">
      <h1>Weather Forecast App</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p>{error}</p>}
          {weatherData && (
            <div>
              <h2>Current Weather in {weatherData.name}</h2>
              <p>Temperature: {weatherData.main.temp} °C</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              <p>Description: {weatherData.weather[0].description}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherApp;
