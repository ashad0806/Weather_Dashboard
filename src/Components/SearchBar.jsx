import { useState } from 'react'

export default function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!city.trim()) return
    onSearch(city)
    setCity('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city..."
        disabled={loading}
        className="flex-1 rounded-lg border border-sky-300 bg-white px-4 py-2 text-slate-700 shadow-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={loading || !city.trim()}
        className="rounded-lg bg-sky-600 px-5 py-2 font-medium text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Search
      </button>
    </form>
  )
}