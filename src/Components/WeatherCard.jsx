export default function WeatherCard({ weather, units }) {
  const {
    city,
    country,
    temp,
    feelsLike,
    description,
    humidity,
    wind,
    icon,
  } = weather

  const tempUnit = units === 'metric' ? '°C' : '°F'
  const windUnit = units === 'metric' ? 'm/s' : 'mph'

  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow-lg">
      <h2 className="text-2xl font-semibold text-slate-800">
        {city}, {country}
      </h2>

      <div className="flex items-center justify-center">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="h-24 w-24"
        />
        <p className="text-6xl font-bold text-sky-700">
          {temp}
          {tempUnit}
        </p>
      </div>

      <p className="capitalize text-slate-600">{description}</p>
      <p className="mb-4 text-sm text-slate-500">
        Feels like {feelsLike}
        {tempUnit}
      </p>

      <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
        <div className="rounded-lg bg-sky-50 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Humidity</p>
          <p className="text-lg font-semibold text-slate-800">{humidity}%</p>
        </div>
        <div className="rounded-lg bg-sky-50 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Wind</p>
          <p className="text-lg font-semibold text-slate-800">
            {wind} {windUnit}
          </p>
        </div>
      </div>
    </div>
  )
}