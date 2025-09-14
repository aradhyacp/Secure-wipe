import { Link } from 'react-router-dom'
import { Shield, Zap, FileCheck, Monitor, CheckCircle } from 'lucide-react'

function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="compliance-badge">
                <Shield size={16} style={{marginRight: '0.5rem'}} />
                NIST SP 800-88 Rev. 1 Compliant
              </div>
              <h1>
                Secure Data <span className="highlight">Wiping</span> for 
                Trustworthy IT Asset Recycling
              </h1>
              <p>
                Unlock India's ₹50,000 crore e-waste potential with certified, verifiable 
                data sanitization. Build public trust through transparent, secure data destruction.
              </p>
              <div className="hero-actions">
                <Link to="/dashboard" className="btn btn-primary">
                  <Zap size={18} />
                  Start Secure Wipe
                </Link>
                <Link to="/verify" className="btn btn-outline">
                  <FileCheck size={18} />
                  Verify Certificate
                </Link>
              </div>
              <div className="trust-indicators">
                <div className="trust-item">
                  <CheckCircle size={16} />
                  Cross-Platform Support
                </div>
                <div className="trust-item">
                  <CheckCircle size={16} />
                  Offline Bootable
                </div>
                <div className="trust-item">
                  <CheckCircle size={16} />
                  Digital Certificates
                </div>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="security-graphic">
                <div style={{
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <Shield size={32} />
                  <Monitor size={32} />
                  <FileCheck size={32} />
                </div>
                <div style={{
                  background: '#1DB954', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '2rem',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  NIST Compliant • Clear • Purge • Destroy
                </div>
                <p style={{marginTop: '1rem', fontSize: '0.875rem'}}>
                  Multi-Platform<br />
                  Windows • Linux • Android
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Security & Trust Features</h2>
            <p>
              Meeting international data sanitization standards with verifiable 
              compliance documentation
            </p>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={24} />
              </div>
              <h3>Cryptographic Verification</h3>
              <p>
                Digital signatures ensure certificate authenticity and prevent 
                tampering with military-grade security standards.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={24} />
              </div>
              <h3>Real-time Monitoring</h3>
              <p>
                Live progress tracking with detailed sector-by-sector 
                sanitization logs and performance metrics.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FileCheck size={24} />
              </div>
              <h3>Comprehensive Auditing</h3>
              <p>
                Complete audit trails with timestamps, methods, and verification 
                records for regulatory compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Simple three-step process for secure data wiping</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Select & Scan</h3>
              <p>Choose devices and scan for data to be securely wiped</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Secure Wipe</h3>
              <p>Apply NIST-compliant wiping methods with real-time monitoring</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Get Certificate</h3>
              <p>Receive cryptographically signed certificate of data destruction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>99.9%</h3>
              <p>Data Destruction Accuracy</p>
            </div>
            <div className="stat-item">
              <h3>1M+</h3>
              <p>Devices Processed</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>NIST Compliant</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Verification Available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage