import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Redirect to login page instead of signup
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, loading, navigate])

  if (loading) {
    return null
  }

  if (!isAuthenticated) {
    return null
  }

  return children
}

export default ProtectedRoute