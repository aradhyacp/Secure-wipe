import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'
import logo from "../assets/6.png";

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
            <div >
                 <img src={logo} width={60} alt="SecureWipe Logo" className="logo-icon" />
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Platform</h4>
            <ul className="footer-links">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/verify">Verify Certificate</Link></li>
              <li><a href="#">API Documentation</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Standards</h4>
            <ul className="footer-links">
              <li><a href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-88r1.pdf" target="_blank">NIST SP 800-88 Rev. 1</a></li>
              <li><a href="https://www.bitraser.com/article/DoD-5220-22-m-standard-for-drive-erasure.php" target="_blank">DoD 5220.22-M</a></li>
              <li><a href="https://gdpr.eu/" target="_blank">GDPR Compliance</a></li>
              <li><a href="https://www.iso.org/standard/27001" target="_blank">ISO 27001</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><Link to="/faq" onClick={() => window.scrollTo(0, 0)}>FAQ</Link></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div>
            <p>&copy; 2025 SecureWipe. Built for Smart India Hackathon 2025.</p>
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