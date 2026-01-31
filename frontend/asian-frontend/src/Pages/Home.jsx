import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Welcome</h1>
      <p className="mb-4">This is the public home page.</p>
      <Link to="/login" className="text-blue-600 underline">
        Log in
      </Link>
    </div>
  )
}
