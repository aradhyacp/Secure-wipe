import { Link, NavLink } from 'react-router-dom'
import { Shield, Underline } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

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
            <li><NavLink className={({ isActive }) => isActive ? 'activeLink' : ''} to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? 'activeLink' : ''} to="/download">Download</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? 'activeLink' : ''} to="/verify">Verify Certificate</NavLink></li>
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