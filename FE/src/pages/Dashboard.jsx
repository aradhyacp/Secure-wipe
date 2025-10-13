import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Download, FileCheck, Key, Copy, Eye, EyeOff, AlertTriangle } from 'lucide-react'

function Dashboard() {
  const [showProductKey, setShowProductKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [totalWipes, setTotalWipes] = useState(0)
  const [certificatesIssued, setCertificatesIssued] = useState(0)
  const [recentCerts, setRecentCerts] = useState([])
  const [metrics, setMetrics] = useState({
    totalWipes: 0,
    productKey: '',
    certificatesIssued: 0
  })

  // Load cached metrics and fetch fresh metrics
  useEffect(() => {
    try {
      const cached = localStorage.getItem('dashboardMetrics')
      if (cached) {
        const parsed = JSON.parse(cached)
        setMetrics((prev) => ({ ...prev, ...parsed }))
      }
    } catch {
      // ignore storage errors
    }

    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`https://secure-wipe-2gyy.onrender.com/api/auth/me`, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          }
        })
        if (!res.ok) return
        const data = await res.json()
        // Debug log to inspect exact API response shape during development
        console.log('AUTH /me response:', data)

        // Normalize stats from possible shapes (keep it simple)
        const newTotalWipes = data?.userStats?.total_wipes ?? 0
        const newCertificatesIssued = data?.userStats?.certificates_issued ?? 0
        const newProductKey = data?.user?.product_key ?? ''
        
        setTotalWipes(newTotalWipes)
        setCertificatesIssued(newCertificatesIssued)

        const next = {
          totalWipes: newTotalWipes,
          productKey: typeof newProductKey === 'string' ? newProductKey : '',
          certificatesIssued: newCertificatesIssued
        }
        setMetrics(next)

        // Recent certificates from response: try several keys
        const rawCerts = Array.isArray(data?.cert)
          ? data.cert
          : Array.isArray(data?.certificates)
            ? data.certificates
            : Array.isArray(data?.certs)
              ? data.certs
              : []
        const normalizedCerts = rawCerts
          .map((c) => ({
            id: c?.certificate_id ?? c?.id ?? undefined,
            device_name: c?.device_name ?? c?.device ?? c?.name ?? 'Unknown Device',
            wipe_date: c?.wipe_date ?? c?.created_at ?? c?.date ?? null,
            status: 'Completed'
          }))
          .slice(0, 5)
        setRecentCerts(normalizedCerts)
        try {
          localStorage.setItem('dashboardMetrics', JSON.stringify(next))
        } catch {
          // ignore storage errors
        }
      } catch {
        // silent fail; UI will show cached/defaults
      }
    }

    fetchMetrics()
  }, [])

  const copyProductKey = () => {
    navigator.clipboard.writeText(metrics.productKey || '')
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
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#0F1724' }}>{totalWipes}</p>
            
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
              {metrics.productKey
                ? (showProductKey ? metrics.productKey : maskProductKey(metrics.productKey))
                : '-'}
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
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#0F1724' }}>{certificatesIssued}</p>
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
            {(recentCerts && recentCerts.length > 0) ? (
              recentCerts.map((c, idx) => (
                <div key={`${c.id ?? idx}`} style={{ padding: '1rem', borderBottom: idx < recentCerts.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: '500', margin: 0 }}>{c.device_name}</p>
                      <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
                        Wiped successfully{c.id ? ` • Certificate: ${c.id}` : ''}{c.wipe_date ? ` • ${new Date(c.wipe_date).toLocaleString()}` : ''}
                      </p>
                    </div>
                    <span style={{ 
                      background: '#DCFCE7', 
                      color: '#166534', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '1rem', 
                      fontSize: '0.75rem' 
                    }}>
                      {c.status || 'Completed'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '1rem', background: '#FFFBEB', borderTop: '1px solid #FDE68A' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#92400E' }}>
                  <AlertTriangle size={18} />
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>No certificates yet</p>
                    <p style={{ margin: 0, fontSize: '0.875rem' }}>Your certificate list is empty. Run a wipe to generate certificates.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard