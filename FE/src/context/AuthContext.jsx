import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize auth state from localStorage on first load
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      if (storedToken && storedUser) {
        setIsAuthenticated(true)
        setUser(JSON.parse(storedUser))
      }
    } catch (_) {
      // ignore storage errors
    } finally {
      setLoading(false)
    }
  }, [])

  const login = (userData, token) => {
    try {
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData))
      }
      if (token) {
        localStorage.setItem('token', token)
      }
    } catch (_) {
      // ignore storage errors
    }
    setIsAuthenticated(true)
    setUser(userData)
  }

  const logout = () => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } catch (_) {
      // ignore storage errors
    }
    setIsAuthenticated(false)
    setUser(null)
  }

  const signup = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      loading,
      login,
      logout,
      signup
    }}>
      {children}
    </AuthContext.Provider>
  )
}