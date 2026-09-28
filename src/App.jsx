import SearchBar from './Components/SearchBar'

export default function App() {
  return (
    <div className="min-h-screen bg-sky-100 p-10">
      <div className="mx-auto max-w-md">
        <SearchBar onSearch={(city) => console.log('Searching:', city)} loading={false} />
      </div>
    </div>
  )
}