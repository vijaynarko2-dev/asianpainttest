import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <p className="text-gray-600">Current Balance</p>
        <p className="text-3xl font-bold text-green-600">₹ {user?.balance || 0}</p>
      </div>
      <p className="mb-4">Welcome, <strong>{user?.name || user?.username}</strong></p>
      <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded">
        Log out
      </button>
    </div>
  )
}
