import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Download, FileCheck, Key, Copy, Eye, EyeOff } from 'lucide-react'

function Dashboard() {
  const [showProductKey, setShowProductKey] = useState(false)
  const [productKey] = useState('SWIPE-2024-ABCD-EFGH-IJKL-MNOP')
  const [copied, setCopied] = useState(false)

  const copyProductKey = () => {
    navigator.clipboard.writeText(productKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleProductKeyVisibility = () => {
    setShowProductKey(!showProductKey)
  }

  const maskProductKey = (key) => {
    const parts = key.split('-')
    return parts.map((part, index) => 
      index === 0 || index === parts.length - 1 ? part : '****'
    ).join('-')
  }

  return (
    <div style={{ minHeight: '80vh', padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            SecureWipe Dashboard
          </h1>
          <p style={{ color: '#6B7280', fontSize: '1.125rem' }}>
            Manage your secure data wiping operations and certificates
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '3rem' 
        }}>
          {/* Total Wipes */}
          <div className="feature-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#6B7280' }}>Total Wipes</h3>
              <Shield size={24} style={{ color: '#1DB954' }} />
            </div>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#0F1724' }}>47</p>
            <p style={{ color: '#1DB954', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>+3 this week</p>
          </div>

          {/* Product Key */}
          <div className="feature-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#6B7280' }}>Product Key</h3>
              <Key size={24} style={{ color: '#1DB954' }} />
            </div>
            <div style={{ 
              background: '#F8FAFC', 
              padding: '0.75rem', 
              borderRadius: '0.5rem', 
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              marginBottom: '0.5rem',
              wordBreak: 'break-all'
            }}>
              {showProductKey ? productKey : maskProductKey(productKey)}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={toggleProductKeyVisibility}
                style={{
                  background: 'transparent',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.375rem',
                  padding: '0.375rem 0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.75rem'
                }}
              >
                {showProductKey ? <EyeOff size={14} /> : <Eye size={14} />}
                {showProductKey ? 'Hide' : 'Show'}
              </button>
              <button 
                onClick={copyProductKey}
                style={{
                  background: copied ? '#DCFCE7' : 'transparent',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.375rem',
                  padding: '0.375rem 0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.75rem',
                  color: copied ? '#166534' : 'inherit'
                }}
              >
                <Copy size={14} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Certificates Issued */}
          <div className="feature-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#6B7280' }}>Certificates Issued</h3>
              <FileCheck size={24} style={{ color: '#1DB954' }} />
            </div>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#0F1724' }}>47</p>
            <p style={{ color: '#1DB954', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>100% verified</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Quick Actions
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem' 
          }}>
            <Link to="/verify" className="btn btn-primary" style={{ 
              padding: '1rem', 
              textAlign: 'center',
              textDecoration: 'none',
              borderRadius: '0.75rem'
            }}>
              <FileCheck size={20} style={{ marginBottom: '0.5rem' }} />
              <div>Verify Certificate</div>
            </Link>
            <Link to="/download" className="btn btn-outline" style={{ 
              padding: '1rem', 
              textAlign: 'center',
              textDecoration: 'none',
              borderRadius: '0.75rem'
            }}>
              <Download size={20} style={{ marginBottom: '0.5rem' }} />
              <div>Download Software</div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Recent Activity
          </h2>
          <div style={{ 
            background: 'white', 
            border: '1px solid #E5E7EB', 
            borderRadius: '0.75rem', 
            overflow: 'hidden' 
          }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: '500', margin: 0 }}>Dell Laptop - Model XPS 13</p>
                  <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
                    Wiped successfully • Certificate: SW-2024-001
                  </p>
                </div>
                <span style={{ 
                  background: '#DCFCE7', 
                  color: '#166534', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '1rem', 
                  fontSize: '0.75rem' 
                }}>
                  Completed
                </span>
              </div>
            </div>
            <div style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: '500', margin: 0 }}>HP Desktop - Model EliteDesk</p>
                  <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
                    Wiped successfully • Certificate: SW-2024-002
                  </p>
                </div>
                <span style={{ 
                  background: '#DCFCE7', 
                  color: '#166534', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '1rem', 
                  fontSize: '0.75rem' 
                }}>
                  Completed
                </span>
              </div>
            </div>
            <div style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: '500', margin: 0 }}>Lenovo ThinkPad - Model T480</p>
                  <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
                    Wiped successfully • Certificate: SW-2024-003
                  </p>
                </div>
                <span style={{ 
                  background: '#DCFCE7', 
                  color: '#166534', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '1rem', 
                  fontSize: '0.75rem' 
                }}>
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard