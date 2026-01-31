import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <p className="mb-4">Welcome, <strong>{user?.username}</strong></p>
      <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded">
        Log out
      </button>
    </div>
  )
}
