const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export async function fetchWeatherByCity(city, units = 'metric') {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`
  const res = await fetch(url)

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('City not found. Check the spelling and try again.')
    }
    if (res.status === 401) {
      throw new Error('Invalid API key. New keys can take a while to activate.')
    }
    throw new Error('Something went wrong. Please try again.')
  }

  const data = await res.json()

  // Return only what the UI needs, in a clean shape
  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    icon: data.weather[0].icon,
  }
}

export async function fetchWeatherByCoords(lat, lon, units = 'metric') {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  const res = await fetch(url)

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Invalid API key. New keys can take a while to activate.')
    }
    throw new Error('Something went wrong. Please try again.')
  }

  const data = await res.json()

  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    icon: data.weather[0].icon,
  }
}