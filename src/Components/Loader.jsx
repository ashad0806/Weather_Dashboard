export default function Loader() {
  return (
    <div className="flex flex-col items-center gap-3 py-8" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />
      <p className="text-sm text-sky-700">Fetching weather...</p>
    </div>
  )
}