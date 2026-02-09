import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null
    } catch {
      return null
    }
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  const base = import.meta.env.VITE_API_URL || 'http://localhost:3000'
  const API = base.endsWith('/') ? base.slice(0, -1) : base

  const login = async ({ username, password }) => {
    try {
      const res = await fetch(`${API}/api/auth/v1/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
        credentials: 'include',
      })
      let data
      try { data = await res.json() } catch (e) { data = null }
      if (!res.ok) {
        console.error('Login error', res.status, data)
        throw new Error((data && data.message) || `Login failed (${res.status})`)
      }
      const userObj = { _id: data.user._id, username: data.user.email, name: data.user.name, role: data.user.role, token: data.token }
      setUser(userObj)
      console.log('Login success', data)
      return data
    } catch (err) {
      console.error('Login network/error', err)
      throw new Error(err.message || 'Network error during login')
    }
  }

  const register = async ({ fullName, email, phone, password }) => {
    try {
      const res = await fetch(`${API}/api/auth/v1/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, email, phone, password }),
      })
      let data
      try { data = await res.json() } catch (e) { data = null }
      if (!res.ok) {
        console.error('Register error', res.status, data)
        throw new Error((data && data.message) || `Registration failed (${res.status})`)
      }
      console.log('Register success', data)
      return data
    } catch (err) {
      console.error('Register network/error', err)
      throw new Error(err.message || 'Network error during registration')
    }
  }

  const refreshUser = async () => {
    try {
      const res = await fetch(`${API}/api/auth/v1/me`, {
        method: 'GET',
        credentials: 'include',
      })
      if (!res.ok) return
      const data = await res.json()
      if (data.success && data.user) {
        setUser((prev) => ({
          ...prev,
          ...data.user,
          username: data.user.email // Ensure consistency
        }))
      }
    } catch (err) {
      console.error('Refresh user error', err)
    }
  }

  const updateProfile = async ({ name, phone }) => {
    try {
      const res = await fetch(`${API}/api/auth/v1/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update profile')
      }
      if (data.success) {
        setUser((prev) => ({
          ...prev,
          ...data.user,
          username: data.user.email
        }))
      }
      return data
    } catch (err) {
      console.error('Update profile error', err)
      throw err
    }
  }

  const logout = async () => {
    try {
      await fetch(`${API}/api/auth/v1/logout`, { method: 'POST', credentials: 'include' })
    } catch (e) {
      // ignore
    }
    setUser(null)
    navigate('/login', { replace: true })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, refreshUser, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
