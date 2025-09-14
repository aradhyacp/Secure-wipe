import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Header() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">
            <Shield className="logo-icon" size={24} />
            SecureWipe
          </Link>
          
          <ul className="nav-links">
            {isAuthenticated && <li><Link to="/dashboard">Dashboard</Link></li>}
            <li><Link to="/download">Download</Link></li>
            <li><Link to="/verify">Verify Certificate</Link></li>
          </ul>
          
          <div className="nav-auth">
            {isAuthenticated ? (
              <>
                <span>Welcome, {user?.name || user?.email || 'User'}</span>
                <button 
                  className="btn btn-outline"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header