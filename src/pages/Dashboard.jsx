import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Shield, Monitor, HardDrive, FileCheck, Zap, AlertTriangle, CheckCircle } from 'lucide-react'

function Dashboard() {
  const { user } = useAuth()

  return (
    <div style={{ padding: '2rem 0', minHeight: '70vh' }}>
      <div className="container">
        {/* Welcome Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Welcome back, <span style={{ color: '#1DB954' }}>{user?.name}</span>
          </h1>
          <p style={{ color: '#6B7280', fontSize: '1.125rem' }}>
            Secure data wiping dashboard - Manage your sanitization tasks
          </p>
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div className="feature-card" style={{ textAlign: 'left', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <HardDrive size={20} style={{ color: '#1DB954', marginRight: '0.5rem' }} />
              <h3 style={{ fontSize: '1rem', margin: 0 }}>Devices Processed</h3>
            </div>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#1DB954' }}>0</p>
          </div>

          <div className="feature-card" style={{ textAlign: 'left', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <FileCheck size={20} style={{ color: '#1DB954', marginRight: '0.5rem' }} />
              <h3 style={{ fontSize: '1rem', margin: 0 }}>Certificates Issued</h3>
            </div>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#1DB954' }}>0</p>
          </div>

          <div className="feature-card" style={{ textAlign: 'left', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <Shield size={20} style={{ color: '#1DB954', marginRight: '0.5rem' }} />
              <h3 style={{ fontSize: '1rem', margin: 0 }}>Active Sessions</h3>
            </div>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#1DB954' }}>0</p>
          </div>

          <div className="feature-card" style={{ textAlign: 'left', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <CheckCircle size={20} style={{ color: '#1DB954', marginRight: '0.5rem' }} />
              <h3 style={{ fontSize: '1rem', margin: 0 }}>Success Rate</h3>
            </div>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#1DB954' }}>--</p>
          </div>
        </div>

        {/* Main Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Start New Wipe */}
          <div className="feature-card" style={{ padding: '2rem' }}>
            <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
              <Zap size={24} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Start Secure Wipe</h3>
            <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
              Begin a new secure data sanitization process with NIST-compliant methods
            </p>
            <button className="btn btn-primary" style={{ width: '100%' }}>
              <Monitor size={18} />
              Launch Wipe Tool
            </button>
          </div>

          {/* Verify Certificate */}
          <div className="feature-card" style={{ padding: '2rem' }}>
            <div className="feature-icon" style={{ margin: '0 0 1rem 0' }}>
              <FileCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Certificate Verification</h3>
            <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
              Verify the authenticity of data sanitization certificates
            </p>
            <Link to="/verify" className="btn btn-outline" style={{ width: '100%', textAlign: 'center' }}>
              <Shield size={18} />
              Verify Certificate
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>Recent Activity</h2>
          <div className="feature-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <AlertTriangle size={48} style={{ color: '#F59E0B', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#F59E0B' }}>No Recent Activity</h3>
            <p style={{ color: '#6B7280' }}>
              Start your first secure wipe to see activity logs and certificates here
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{
          background: '#F8FAFC',
          padding: '2rem',
          borderRadius: '1rem',
          border: '1px solid #E5E7EB'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Quick Links</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <Link to="/download" style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem',
              background: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              color: '#374151',
              border: '1px solid #E5E7EB',
              transition: 'all 0.2s'
            }} onMouseOver={(e) => e.target.style.borderColor = '#1DB954'} 
               onMouseOut={(e) => e.target.style.borderColor = '#E5E7EB'}>
              <Monitor size={16} style={{ marginRight: '0.5rem' }} />
              Download Software
            </Link>
            
            <a href="#" style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem',
              background: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              color: '#374151',
              border: '1px solid #E5E7EB',
              transition: 'all 0.2s'
            }} onMouseOver={(e) => e.target.style.borderColor = '#1DB954'} 
               onMouseOut={(e) => e.target.style.borderColor = '#E5E7EB'}>
              <FileCheck size={16} style={{ marginRight: '0.5rem' }} />
              Documentation
            </a>
            
            <a href="#" style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem',
              background: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              color: '#374151',
              border: '1px solid #E5E7EB',
              transition: 'all 0.2s'
            }} onMouseOver={(e) => e.target.style.borderColor = '#1DB954'} 
               onMouseOut={(e) => e.target.style.borderColor = '#E5E7EB'}>
              <Shield size={16} style={{ marginRight: '0.5rem' }} />
              Support Center
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard