export default function SearchHistory({ history, onSelect, onClear, disabled }) {
  if (history.length === 0) return null

  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-sky-800">Recent searches</p>
        <button
          onClick={onClear}
          className="text-xs text-sky-600 hover:text-sky-800 hover:underline"
        >
          Clear
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            disabled={disabled}
            className="rounded-full bg-white px-3 py-1 text-sm text-sky-700 shadow-sm transition hover:bg-sky-100 disabled:opacity-50"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  )
}