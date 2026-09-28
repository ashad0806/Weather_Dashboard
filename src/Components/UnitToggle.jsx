export default function UnitToggle({ units, onChange, disabled }) {
  const options = [
    { value: 'metric', label: '°C' },
    { value: 'imperial', label: '°F' },
  ]

  return (
    <div className="inline-flex overflow-hidden rounded-lg border border-sky-300 bg-white shadow-sm">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          disabled={disabled}
          className={`px-4 py-1 text-sm font-medium transition disabled:opacity-60 ${
            units === option.value
              ? 'bg-sky-600 text-white'
              : 'text-sky-700 hover:bg-sky-100'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}