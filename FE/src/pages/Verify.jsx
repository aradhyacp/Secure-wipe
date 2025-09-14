import { useState } from 'react'
import { Shield, CheckCircle, XCircle, FileCheck } from 'lucide-react'

function Verify() {
  const [certificateId, setCertificateId] = useState('')
  const [loading, setLoading] = useState(false)
  const [verificationResult, setVerificationResult] = useState(null)
  const [error, setError] = useState('')

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!certificateId.trim()) {
      setError('Please enter a certificate ID')
      return
    }

    setLoading(true)
    setError('')
    setVerificationResult(null)

    try {
      // API call to /cert/verify
      const response = await fetch('/cert/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ certificateId: certificateId.trim() })
      })

      const data = await response.json()

      if (response.ok) {
        setVerificationResult({
          valid: data.valid,
          certificate: data.certificate
        })
      } else {
        setError(data.message || 'Verification failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setCertificateId('')
    setVerificationResult(null)
    setError('')
  }

  return (
    <div style={{ minHeight: '80vh', padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0F1724' }}>
            Certificate Verification
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
            Instantly verify the authenticity and integrity of data wiping certificates
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Verify Certificate Section */}
          <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '1rem', padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <FileCheck size={24} style={{ marginRight: '0.75rem', color: '#1DB954' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Verify Certificate</h2>
            </div>
            <p style={{ color: '#6B7280', marginBottom: '2rem' }}>
              Enter certificate ID or scan QR code to verify authenticity
            </p>

            <form onSubmit={handleVerify}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                  Certificate ID
                </label>
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="CERT-SW-2024-XXXXXX"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    outline: 'none',
                    fontFamily: 'monospace'
                  }}
                />
              </div>

              {error && (
                <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Shield size={18} style={{ marginRight: '0.5rem' }} />
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
                {verificationResult && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-outline"
                    style={{ padding: '0.75rem 1.5rem' }}
                  >
                    Reset
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Verification Results Section */}
          <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '1rem', padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <Shield size={24} style={{ marginRight: '0.75rem', color: '#1DB954' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Verification Results</h2>
            </div>
            <p style={{ color: '#6B7280', marginBottom: '2rem' }}>
              Real-time verification status and certificate details
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
              {!verificationResult ? (
                <>
                  <Shield size={64} style={{ color: '#D1D5DB', marginBottom: '1rem' }} />
                  <p style={{ color: '#9CA3AF', textAlign: 'center' }}>
                    Enter a certificate ID to verify
                  </p>
                </>
              ) : verificationResult.valid ? (
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <div style={{ background: '#DCFCE7', borderRadius: '50%', width: '4rem', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <CheckCircle size={32} style={{ color: '#16A34A' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#16A34A', marginBottom: '1rem' }}>
                    ✅ Authentic Certificate
                  </h3>
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '0.5rem', padding: '1rem', textAlign: 'left' }}>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: '500', color: '#374151' }}>Device: </span>
                      <span style={{ color: '#6B7280' }}>{verificationResult.certificate?.deviceName || 'N/A'}</span>
                    </div>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: '500', color: '#374151' }}>Date: </span>
                      <span style={{ color: '#6B7280' }}>{verificationResult.certificate?.date || 'N/A'}</span>
                    </div>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: '500', color: '#374151' }}>Method: </span>
                      <span style={{ color: '#6B7280' }}>{verificationResult.certificate?.method || 'N/A'}</span>
                    </div>
                    <div>
                      <span style={{ fontWeight: '500', color: '#374151' }}>Status: </span>
                      <span style={{ color: '#16A34A', fontWeight: '500' }}>Verified & Authentic</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ background: '#FEE2E2', borderRadius: '50%', width: '4rem', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <XCircle size={32} style={{ color: '#DC2626' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#DC2626', marginBottom: '1rem' }}>
                    ❌ Invalid Certificate
                  </h3>
                  <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '0.5rem', padding: '1rem' }}>
                    <p style={{ color: '#B91C1C', fontWeight: '500' }}>
                      Certificate is tampered, invalid, or does not exist in our database.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '1rem', padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
              How Certificate Verification Works
            </h3>
            <p style={{ color: '#6B7280', lineHeight: '1.6' }}>
              Our verification system uses cryptographic signatures to ensure certificate authenticity. 
              Each certificate is digitally signed and cannot be tampered with. The verification process 
              checks the certificate against our secure database and validates the digital signature 
              to confirm its authenticity and integrity.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verify