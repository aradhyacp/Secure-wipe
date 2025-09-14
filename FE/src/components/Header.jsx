import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Shield } from 'lucide-react'

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">
            <Shield className="logo-icon" size={24} />
            SecureWipe
          </Link>
          
          <ul className="nav-links">
            <li>
              <Link 
                to="/dashboard" 
                className={isActive('/dashboard') ? 'nav-active' : ''}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/download"
                className={isActive('/download') ? 'nav-active' : ''}
              >
                Download
              </Link>
            </li>
            <li>
              <Link 
                to="/verify"
                className={isActive('/verify') ? 'nav-active' : ''}
              >
                Verify Certificate
              </Link>
            </li>
          </ul>
          
          <div className="nav-auth">
            {isLoggedIn ? (
              <>
                <span>Welcome, {username}</span>
                <button 
                  className="btn btn-outline"
                  onClick={() => setIsLoggedIn(false)}
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