import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Invite from './Pages/Invite.jsx'
import Orders from './Pages/Orders.jsx'
import Profile from './Pages/Profile.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/invite" element={
          <ProtectedRoute>
            <Invite />
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
