import { useState } from 'react'
import { fetchWeatherByCity } from './Services/weatherApi'
import SearchBar from './Components/SearchBar'
import Loader from './Components/Loader'
import ErrorMessage from './Components/ErrorMessage'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (city) => {
    setLoading(true)
    setError('')

    try {
      const data = await fetchWeatherByCity(city)
      console.log(data) // temporary: WeatherCard comes in the next step
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-sky-100 px-4 py-10">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-sky-800">
          Weather Dashboard
        </h1>

        <SearchBar onSearch={handleSearch} loading={loading} />

        <div className="mt-6">
          {loading && <Loader />}
          {error && !loading && <ErrorMessage message={error} />}
        </div>
      </div>
    </div>
  )
}