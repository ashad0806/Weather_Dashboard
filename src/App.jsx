import { useState, useEffect } from 'react'
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  fetchForecastByCity,
} from './Services/weatherApi'
import SearchBar from './Components/SearchBar'
import SearchHistory from './Components/SearchHistory'
import UnitToggle from './Components/UnitToggle'
import LocationButton from './Components/LocationButton'
import Loader from './Components/Loader'
import ErrorMessage from './Components/ErrorMessage'
import WeatherCard from './Components/WeatherCard'
import ForecastStrip from './Components/ForecastStrip'

const HISTORY_KEY = 'weather-search-history'
const MAX_HISTORY = 5

export default function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [units, setUnits] = useState('metric')
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  }, [history])

  const addToHistory = (city) => {
    setHistory((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== city.toLowerCase()
      )
      return [city, ...filtered].slice(0, MAX_HISTORY)
    })
  }

  const loadWeather = async (city, unitSystem, saveToHistory) => {
    setLoading(true)
    setError('')

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCity(city, unitSystem),
        fetchForecastByCity(city, unitSystem),
      ])
      setWeather(weatherData)
      setForecast(forecastData)
      if (saveToHistory) addToHistory(weatherData.city)
    } catch (err) {
      setWeather(null)
      setForecast(null)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Used by the search bar and history chips
  const handleSearch = (city) => loadWeather(city, units, true)

  // Switching units re-fetches the current city, without touching history
  const handleUnitChange = (newUnits) => {
    setUnits(newUnits)
    if (weather) loadWeather(weather.city, newUnits, false)
  }

  const handleClearHistory = () => setHistory([])

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }

    setLoading(true)
    setError('')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const weatherData = await fetchWeatherByCoords(latitude, longitude, units)
          const forecastData = await fetchForecastByCity(weatherData.city, units)
          setWeather(weatherData)
          setForecast(forecastData)
          addToHistory(weatherData.city)
        } catch (err) {
          setWeather(null)
          setForecast(null)
          setError(err.message)
        } finally {
          setLoading(false)
        }
      },
      () => {
        setError('Location access was denied. Please allow it or search manually.')
        setLoading(false)
      }
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-sky-50 px-4 py-10">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-sky-800">
          Weather Dashboard
        </h1>

        <SearchBar onSearch={handleSearch} loading={loading} />

        <div className="mt-2 flex justify-center">
          <LocationButton onLocate={handleLocate} loading={loading} />
        </div>

        <SearchHistory
          history={history}
          onSelect={handleSearch}
          onClear={handleClearHistory}
          disabled={loading}
        />

        <div className="mt-4 flex justify-end">
          <UnitToggle
            units={units}
            onChange={handleUnitChange}
            disabled={loading}
          />
        </div>

        <div className="mt-4">
          {loading && <Loader />}
          {error && !loading && <ErrorMessage message={error} />}
          {weather && !loading && !error && (
            <>
              <WeatherCard weather={weather} units={units} />
              {forecast && <ForecastStrip forecast={forecast} units={units} />}
            </>
          )}
          {!weather && !loading && !error && (
            <p className="text-center text-sky-700">
              Search for a city to see its weather.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}