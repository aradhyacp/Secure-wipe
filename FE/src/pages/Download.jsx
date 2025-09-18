import { useState } from 'react'
import { Download, Monitor, Smartphone, HardDrive, Shield, CheckCircle, FileCheck, Zap } from 'lucide-react'

function DownloadPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('windows')

  const platforms = [
    {
      id: 'windows',
      name: 'Windows',
      icon: Monitor,
      version: 'v2.4.1',
      size: '127 MB',
      description: 'Compatible with Windows 10, 11 (x64)',
      downloadUrl: '#'
    },
    {
      id: 'linux',
      name: 'Linux',
      icon: Monitor,
      version: 'v2.4.1',
      size: '95 MB',
      description: 'Ubuntu 20.04+, CentOS 8+, Debian 11+',
      downloadUrl: '#'
    },
    {
      id: 'MacOS',
      name: 'MacOS',
      icon: Monitor,
      version: 'v13.3',
      size: '145 MB',
      description: 'MacOS 13.0+ ',
      downloadUrl: '#'
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'NIST Compliant',
      description: 'Meets NIST SP 800-88 Rev. 1 standards for secure data sanitization'
    },
    {
      icon: HardDrive,
      title: 'Multi-Device Support',
      description: 'Works with HDDs, SSDs, USB drives, and mobile devices'
    },
    {
      icon: FileCheck,
      title: 'Digital Certificates',
      description: 'Generates cryptographically signed certificates of destruction'
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: 'Live progress tracking with detailed sanitization logs'
    }
  ]

  return (
    <div style={{ minHeight: '80vh', padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Download SecureWipe
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
            Professional data sanitization software for secure IT asset disposal
          </p>
        </div>

        {/* Platform Selection */}
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '1rem', padding: '2rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', textAlign: 'center' }}>
            Choose Your Platform
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {platforms.map((platform) => {
              const IconComponent = platform.icon
              return (
                <div
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  style={{
                    border: selectedPlatform === platform.id ? '2px solid #1DB954' : '1px solid #E5E7EB',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: selectedPlatform === platform.id ? '#F0FDF4' : 'white'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <IconComponent size={24} style={{ marginRight: '0.75rem', color: selectedPlatform === platform.id ? '#1DB954' : '#6B7280' }} />
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{platform.name}</h3>
                    {selectedPlatform === platform.id && (
                      <CheckCircle size={18} style={{ marginLeft: 'auto', color: '#1DB954' }} />
                    )}
                  </div>
                  <p style={{ color: '#6B7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {platform.description}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#6B7280' }}>
                    <span>Version: {platform.version}</span>
                    <span>Size: {platform.size}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Download Button */}
          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem', fontWeight: '600' }}>
              <Download size={20} style={{ marginRight: '0.5rem' }} />
              Download for {platforms.find(p => p.id === selectedPlatform)?.name}
            </button>
            {/* <p style={{ color: '#6B7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Free 30-day trial • No credit card required
            </p> */}
          </div>
        </div>

        {/* Screenshots/Demo Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', textAlign: 'center', marginBottom: '2rem' }}>
            See SecureWipe in Action
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {/* Screenshot Placeholders */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '1rem', padding: '2rem', textAlign: 'center' }}>
              <div style={{ background: '#1E293B', borderRadius: '0.5rem', padding: '2rem', marginBottom: '1rem', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1DB954' }}>
                <div>
                  <Monitor size={48} style={{ marginBottom: '1rem' }} />
                  <p>Main Dashboard</p>
                </div>
              </div>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Intuitive Interface</h3>
              <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
                Clean, professional interface for managing all your data wiping operations
              </p>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '1rem', padding: '2rem', textAlign: 'center' }}>
              <div style={{ background: '#1E293B', borderRadius: '0.5rem', padding: '2rem', marginBottom: '1rem', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1DB954' }}>
                <div>
                  <Zap size={48} style={{ marginBottom: '1rem' }} />
                  <p>Real-time Progress</p>
                </div>
              </div>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Live Monitoring</h3>
              <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
                Track wiping progress in real-time with detailed sector-by-sector logs
              </p>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '1rem', padding: '2rem', textAlign: 'center' }}>
              <div style={{ background: '#1E293B', borderRadius: '0.5rem', padding: '2rem', marginBottom: '1rem', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1DB954' }}>
                <div>
                  <FileCheck size={48} style={{ marginBottom: '1rem' }} />
                  <p>Digital Certificates</p>
                </div>
              </div>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Compliance Reports</h3>
              <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
                Generate compliant certificates with cryptographic verification
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div style={{ background: '#F8FAFC', borderRadius: '1rem', padding: '3rem 2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', textAlign: 'center', marginBottom: '2rem' }}>
            Why Choose SecureWipe?
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{ background: '#DCFCE7', color: '#1DB954', width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <IconComponent size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* System Requirements */}
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', textAlign: 'center', marginBottom: '2rem' }}>
            System Requirements
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '0.75rem', padding: '1.5rem' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                <Monitor size={18} style={{ marginRight: '0.5rem', color: '#1DB954' }} />
                Windows
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#6B7280', fontSize: '0.875rem' }}>
                <li style={{ marginBottom: '0.25rem' }}>• Windows 10/11 (64-bit)</li>
                <li style={{ marginBottom: '0.25rem' }}>• 4GB RAM minimum</li>
                <li style={{ marginBottom: '0.25rem' }}>• 500MB free disk space</li>
                <li style={{ marginBottom: '0.25rem' }}>• Administrator privileges</li>
              </ul>
            </div>
            
            <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '0.75rem', padding: '1.5rem' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                <Monitor size={18} style={{ marginRight: '0.5rem', color: '#1DB954' }} />
                Linux
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#6B7280', fontSize: '0.875rem' }}>
                <li style={{ marginBottom: '0.25rem' }}>• Ubuntu 20.04+, CentOS 8+</li>
                <li style={{ marginBottom: '0.25rem' }}>• 2GB RAM minimum</li>
                <li style={{ marginBottom: '0.25rem' }}>• 300MB free disk space</li>
                <li style={{ marginBottom: '0.25rem' }}>• Root or sudo access</li>
              </ul>
            </div>
            
            <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '0.75rem', padding: '1.5rem' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                <Smartphone size={18} style={{ marginRight: '0.5rem', color: '#1DB954' }} />
                MacOS
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#6B7280', fontSize: '0.875rem' }}>
                <li style={{ marginBottom: '0.25rem' }}>• MacOS 10.15+</li>
                <li style={{ marginBottom: '0.25rem' }}>• 4GB RAM minimum</li>
                <li style={{ marginBottom: '0.25rem' }}>• 500MB free storage</li>
                <li style={{ marginBottom: '0.25rem' }}>• Root access required</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadPage