function formatDay(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, { weekday: 'short' })
}

export default function ForecastStrip({ forecast, units }) {
  const tempUnit = units === 'metric' ? '°C' : '°F'

  return (
    <div className="mt-4 grid grid-cols-5 gap-2">
      {forecast.map((day) => (
        <div
          key={day.date}
          className="flex flex-col items-center rounded-xl bg-white p-2 text-center shadow-sm"
        >
          <p className="text-xs font-medium text-slate-600">{formatDay(day.date)}</p>
          <img
            src={`https://openweathermap.org/img/wn/${day.icon}.png`}
            alt={day.condition}
            className="h-10 w-10"
          />
          <p className="text-sm font-semibold text-slate-800">
            {day.temp}
            {tempUnit}
          </p>
        </div>
      ))}
    </div>
  )
}