const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

function shapeWeatherData(data) {
  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    windGust: data.wind.gust ? Math.round(data.wind.gust * 10) / 10 : null,
    icon: data.weather[0].icon,
    lat: data.coord.lat,
    lon: data.coord.lon,
  }
}

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
  return shapeWeatherData(data)
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
  return shapeWeatherData(data)
}

export async function fetchForecastByCity(city, units = 'metric') {
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`
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

  const daily = {}
  data.list.forEach((entry) => {
    const [date, time] = entry.dt_txt.split(' ')
    if (!daily[date] || time === '12:00:00') {
      daily[date] = entry
    }
  })

  return Object.entries(daily)
    .slice(0, 5)
    .map(([date, entry]) => ({
      date,
      temp: Math.round(entry.main.temp),
      condition: entry.weather[0].main,
      icon: entry.weather[0].icon,
    }))
}

const AQI_LABELS = {
  1: 'Excellent',
  2: 'Good',
  3: 'Moderate',
  4: 'Poor',
  5: 'Very Poor',
}

export async function fetchAirQuality(lat, lon) {
  const url = `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Could not load air quality data.')
  }

  const data = await res.json()
  const aqi = data.list[0].main.aqi // 1 (best) to 5 (worst)

  return {
    aqi,
    label: AQI_LABELS[aqi] || 'Unknown',
  }
}