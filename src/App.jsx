import { fetchWeatherByCity } from './Services/weatherApi'

fetchWeatherByCity('Kathmandu').then(console.log).catch(console.error)

export default function App() {
  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-sky-700">Weather Dashboard</h1>
    </div>
  )
}