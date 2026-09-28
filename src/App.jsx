import { useState, useEffect } from 'react'
import { fetchWeatherByCity } from './Services/weatherApi'
import SearchBar from './Components/SearchBar'
import SearchHistory from './Components/SearchHistory'
import UnitToggle from './Components/UnitToggle'
import Loader from './Components/Loader'
import ErrorMessage from './Components/ErrorMessage'
import WeatherCard from './Components/WeatherCard'

const HISTORY_KEY = 'weather-search-history'
const MAX_HISTORY = 5

export default function App() {
  const [weather, setWeather] = useState(null)
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
      const data = await fetchWeatherByCity(city, unitSystem)
      setWeather(data)
      if (saveToHistory) addToHistory(data.city)
    } catch (err) {
      setWeather(null)
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-sky-50 px-4 py-10">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-sky-800">
          Weather Dashboard
        </h1>

        <SearchBar onSearch={handleSearch} loading={loading} />

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
            <WeatherCard weather={weather} units={units} />
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