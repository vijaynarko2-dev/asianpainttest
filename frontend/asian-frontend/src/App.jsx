import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Invite from './pages/Invite.jsx'
import Orders from './pages/Orders.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
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
