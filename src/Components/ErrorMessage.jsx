export default function ErrorMessage({ message }) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-red-700"
    >
      <p className="font-medium">Oops!</p>
      <p className="text-sm">{message}</p>
    </div>
  )
}