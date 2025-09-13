import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>SecureWipe</h4>
            <p style={{color: '#94A3B8', marginBottom: '1rem'}}>
              Empowering India's circular economy through secure, verifiable data sanitization.
            </p>
            <div style={{
              background: '#374151', 
              padding: '1rem', 
              borderRadius: '0.5rem', 
              fontSize: '0.875rem',
              textAlign: 'center',
              color: '#94A3B8'
            }}>
              [Footer Image Placeholder - Security/Trust Visual]
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Platform</h4>
            <ul className="footer-links">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/verify">Verify Certificate</Link></li>
              <li><a href="#">API Documentation</a></li>
              <li><a href="#">Enterprise Solutions</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Standards</h4>
            <ul className="footer-links">
              <li><a href="#">NIST SP 800-88 Rev. 1</a></li>
              <li><a href="#">DoD 5220.22-M</a></li>
              <li><a href="#">GDPR Compliance</a></li>
              <li><a href="#">ISO 27001</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Case Studies</a></li>
              <li><a href="#">Support Center</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div>
            <p>&copy; 2024 SecureWipe. Built for Smart India Hackathon 2024.</p>
            <p style={{fontSize: '0.875rem', color: '#94A3B8', marginTop: '0.5rem'}}>
              Addressing India's ₹50,000 crore e-waste challenge through secure data sanitization.
            </p>
          </div>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Security</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer