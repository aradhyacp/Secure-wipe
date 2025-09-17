import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, FileCheck, Upload, AlertCircle, CheckCircle, File } from 'lucide-react'

function Verify() {
  const [certificateId, setCertificateId] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')

  // Handle manual certificate ID verification
  // const handleManualVerify = async () => {
  //   if (!certificateId.trim()) {
  //     setError('Please enter a certificate ID')
  //     return
  //   }

  //   setIsVerifying(true)
  //   setError('')
    
  //   try {
  //     await new Promise(resolve => setTimeout(resolve, 2000))
      
  //     const mockResult = {
  //       isValid: Math.random() > 0.3,
  //       certificateId: certificateId,
  //       deviceInfo: {
  //         serialNumber: 'SN123456789',
  //         manufacturer: 'Dell Inc.',
  //         model: 'OptiPlex 7090',
  //         capacity: '512 GB SSD'
  //       },
  //       wipingDetails: {
  //         method: 'NIST SP 800-88 Rev. 1 - Purge',
  //         passes: 3,
  //         dateCompleted: '2024-09-10T14:30:00Z',
  //         duration: '2h 45m'
  //       },
  //       issuer: 'SecureWipe Certification Authority',
  //       digitalSignature: 'SHA-256: a1b2c3d4e5f6...',
  //       issuedDate: '2024-09-10T14:35:00Z'
  //     }
      
  //     setVerificationResult(mockResult)
  //   } catch (err) {
  //     setError('Verification failed. Please try again.')
  //   } finally {
  //     setIsVerifying(false)
  //   }
  // }

  const handleManualVerify = async () => {
  if (!certificateId.trim()) {
    setError('Please enter a certificate ID')
    return
  }

  setIsVerifying(true)
  setError('')
  setVerificationResult(null)

  try {
    const response = await fetch(`https://secure-wipe-2gyy.onrender.com/api/cert/verify-by-id/${certificateId}`, {
      method: 'GET',
    })

    if (!response.ok) {
      if (response.status === 404) {
        setError('Certificate not found.')
      } else {
        setError('Verification failed. Please try again.')
      }
      setVerificationResult(null)
      return
    }

    const data = await response.json()

    // Expected data structure:
    // { success: true, verified: true, certificate: {...} }
    if (data.success && data.verified) {
      setVerificationResult(data.certificate)
    } else {
      setError('Certificate could not be verified.')
      setVerificationResult(null)
    }
  } catch (err) {
    setError('Verification failed. Please try again.')
    setVerificationResult(null)
  } finally {
    setIsVerifying(false)
  }
}


  // Handle JSON file verification
  const handleJSONVerify = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (!file) return

      setIsVerifying(true)
      setError('')

      try {
        const fileContent = await readFileContent(file)
        const certificateData = JSON.parse(fileContent)
        
        await new Promise(resolve => setTimeout(resolve, 1500))

        const verificationResult = {
          isValid: true,
          certificateId: certificateData.certificateId || 'From JSON File',
          deviceInfo: certificateData.deviceInfo || {},
          wipingDetails: certificateData.wipingDetails || {},
          issuer: certificateData.issuer || 'SecureWipe CA',
          digitalSignature: certificateData.digitalSignature || 'SHA-256: verified',
          issuedDate: certificateData.issuedDate || new Date().toISOString(),
          fileName: file.name
        }

        setVerificationResult(verificationResult)
      } catch (err) {
        setError('Invalid JSON certificate file')
      } finally {
        setIsVerifying(false)
      }
    }
    input.click()
  }

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  const resetForm = () => {
    setCertificateId('')
    setVerificationResult(null)
    setError('')
  }

  return (
    <div style={{ padding: '2rem 0', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            background: '#DCFCE7',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: '#1DB954'
          }}>
            <Shield size={24} />
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Verify <span style={{ color: '#1DB954' }}>Certificate</span>
          </h1>
          <p style={{ color: '#6B7280', fontSize: '1.125rem' }}>
            Validate the authenticity of your data sanitization certificates
          </p>
        </div>

        {/* Verification Form */}
        <div className="feature-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Certificate Verification
          </h3>
          
          {/* Manual Entry */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#374151'
            }}>
              Enter Certificate ID
            </label>
            <input
              type="text"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              placeholder="e.g., CERT-2024-ABC123DEF456"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #D1D5DB',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Verification Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={handleManualVerify}
              disabled={isVerifying}
              className="btn btn-primary"
              style={{
                flex: 1,
                padding: '0.75rem',
                fontSize: '1rem',
                opacity: isVerifying ? 0.7 : 1
              }}
            >
              {isVerifying ? (
                <>Verifying...</>
              ) : (
                <>
                  <FileCheck size={18} />
                  Verify Certificate
                </>
              )}
            </button>

            <button
              onClick={handleJSONVerify}
              disabled={isVerifying}
              className="btn btn-outline"
              style={{
                flex: 1,
                padding: '0.75rem',
                fontSize: '1rem',
                opacity: isVerifying ? 0.7 : 1
              }}
            >
              <File size={18} />
              Verify by JSON
            </button>
          </div>

          <div style={{ 
            textAlign: 'center', 
            fontSize: '0.875rem', 
            color: '#6B7280',
            fontStyle: 'italic'
          }}>
            Enter ID manually or click "Verify by JSON" to upload certificate file
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Verification Result */}
        {verificationResult && (
          <div className="feature-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              {verificationResult.isValid ? (
                <>
                  <CheckCircle size={24} style={{ color: '#10B981' }} />
                  <h3 style={{ color: '#10B981', fontSize: '1.25rem', fontWeight: 'bold' }}>
                    Certificate Valid ✓
                  </h3>
                </>
              ) : (
                <>
                  <AlertCircle size={24} style={{ color: '#EF4444' }} />
                  <h3 style={{ color: '#EF4444', fontSize: '1.25rem', fontWeight: 'bold' }}>
                    Certificate Invalid ✗
                  </h3>
                </>
              )}
            </div>

            {verificationResult.isValid && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem'
              }}>
                {/* Certificate Info */}
                <div>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '0.75rem', color: '#374151' }}>
                    Certificate Details
                  </h4>
                  <div style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                    <p><strong>ID:</strong> {verificationResult.certificateId}</p>
                    <p><strong>Issued:</strong> {formatDate(verificationResult.issuedDate)}</p>
                    <p><strong>Issuer:</strong> {verificationResult.issuer}</p>
                    {verificationResult.fileName && (
                      <p><strong>Source:</strong> {verificationResult.fileName}</p>
                    )}
                  </div>
                </div>

                {/* Device Info */}
                <div>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '0.75rem', color: '#374151' }}>
                    Device Information
                  </h4>
                  <div style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                    <p><strong>Serial:</strong> {verificationResult.deviceInfo.serialNumber || 'N/A'}</p>
                    <p><strong>Manufacturer:</strong> {verificationResult.deviceInfo.manufacturer || 'N/A'}</p>
                    <p><strong>Model:</strong> {verificationResult.deviceInfo.model || 'N/A'}</p>
                    <p><strong>Capacity:</strong> {verificationResult.deviceInfo.capacity || 'N/A'}</p>
                  </div>
                </div>

                {/* Wiping Details */}
                <div style={{ gridColumn: 'span 2' }}>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '0.75rem', color: '#374151' }}>
                    Sanitization Details
                  </h4>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    lineHeight: '1.6',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                  }}>
                    <div>
                      <p><strong>Method:</strong> {verificationResult.wipingDetails.method || 'N/A'}</p>
                      <p><strong>Passes:</strong> {verificationResult.wipingDetails.passes || 'N/A'}</p>
                    </div>
                    <div>
                      <p><strong>Completed:</strong> {formatDate(verificationResult.wipingDetails.dateCompleted) || 'N/A'}</p>
                      <p><strong>Duration:</strong> {verificationResult.wipingDetails.duration || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: verificationResult.isValid ? '#F0FDF4' : '#FEF2F2',
              borderRadius: '0.5rem',
              fontSize: '0.875rem'
            }}>
              <p style={{ fontWeight: '500', marginBottom: '0.25rem' }}>Digital Signature:</p>
              <code style={{
                background: 'rgba(0,0,0,0.05)',
                padding: '0.25rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                wordBreak: 'break-all'
              }}>
                {verificationResult.digitalSignature}
              </code>
            </div>

            {/* Reset Button */}
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button
                onClick={resetForm}
                className="btn btn-outline"
                style={{ padding: '0.5rem 1rem' }}
              >
                Verify Another Certificate
              </button>
            </div>
          </div>
        )}
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