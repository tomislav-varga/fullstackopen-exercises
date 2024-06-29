import React from 'react'
import { useState, useEffect } from 'react'

const api_key = import.meta.env.VITE_KEY

const SelectedCountry = ( {selectedCountry} ) => {

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        if (selectedCountry) {
          const capital = selectedCountry.capital
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
    
          fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
              setWeather(data)
            })
            .catch(error => console.error("Failed to fetch weather data", error))
        }
      }, [selectedCountry])

    if (selectedCountry) {
      return (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Population: {selectedCountry.population}</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(selectedCountry.languages).map((language, index) => <li key={index}>{language}</li>)}          
          </ul>
          <p style={{ fontSize: '100px' }}>{selectedCountry.flag}</p>
          <h3>Weather in {selectedCountry.capital}</h3>
          {weather && (
            <div>
                <p>Temperature: {weather.main.temp} °C</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather icon" />
                <p>Wind Speed: {weather.wind.speed} m/s</p>
            </div>
          )}

        </div>
      )
    } 
    else {
      return <p>No matches found</p>
  }
}

export default SelectedCountry