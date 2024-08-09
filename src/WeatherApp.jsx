import React, { useState } from 'react'
import styles from './WeatherApp.module.css'

export const WeatherApp = () => {

    const [ city, setCity ] = useState('')
    const [ weatherData, setWeatherData ] = useState(null)

    const baseUrl = `https://api.openweathermap.org/data/2.5/weather`
    const apiKey = '62e828316353954cf888ec5d6dcab63e'
    const difKelvin = 273.15

    const fetchWeatherData = async() => {
        try {
            const response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&lang=es`)
            const data = await response.json()
            setWeatherData(data)
        }
        catch (error){
            console.error(error)
        }
    }

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchWeatherData()
    }

    return (
        <div className={styles.container}>
            <h1>Weather App</h1>

            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    placeholder='Ingrese ciudad' 
                    value={city}
                    onChange={handleCityChange}
                    />
                <button type='submit'>Buscar ciudad</button>
            </form>
            {weatherData && (
                <div>
                    <h2>{weatherData.name} - {weatherData.sys.country}</h2>
                    <p>Altitud al nivel del mar: {weatherData.main.sea_level} m</p>
                    <p>Humedad: {weatherData.main.humidity}%</p>
                    <p>Temperatura: { Math.round(weatherData.main.temp - difKelvin, -2)}º C</p>
                    <p>Sensación termica: {Math.round(weatherData.main.feels_like - difKelvin, -2)}º C</p>
                    <p>Visibilidad: {weatherData.visibility}</p>
                    <p>Nubosidad: {weatherData.clouds.all}%</p>
                    <p>Viento: {weatherData.wind.speed} Kts, de los: {weatherData.wind.deg}º</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>
                    <p>{weatherData.weather[0].description}</p>
                </div>
                ) 
            }
        </div>
    )
}
