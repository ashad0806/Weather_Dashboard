export default function LocationButton({ onLocate, loading }) {
  return (
    <button
      onClick={onLocate}
      disabled={loading}
      className="flex items-center gap-1 text-sm text-sky-700 hover:text-sky-900 hover:underline disabled:opacity-50"
    >
      📍 Use my location
    </button>
  )
}