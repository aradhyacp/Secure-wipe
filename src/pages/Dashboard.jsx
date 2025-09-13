import { useState, useEffect } from 'react'
import { Shield, HardDrive, FileCheck, Key, User, Mail } from 'lucide-react'

function Dashboard() {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    productKey: 'SW-2024-XXXXX-XXXXX'
  })
  
  const [stats, setStats] = useState({
    totalDisksWiped: 15,
    certificatesGenerated: 12
  })

  const [certificates, setCertificates] = useState([
    { id: 'CERT-001', diskName: 'LAPTOP-DEV-001', date: '15/01/2024', certificateId: 'SW-2024-001-ABC123' },
    { id: 'CERT-002', diskName: 'SERVER-PROD-02', date: '14/01/2024', certificateId: 'SW-2024-002-DEF456' },
    { id: 'CERT-003', diskName: 'WORKSTATION-03', date: '13/01/2024', certificateId: 'SW-2024-003-GHI789' },
    { id: 'CERT-004', diskName: 'LAPTOP-TEST-04', date: '12/01/2024', certificateId: 'SW-2024-004-JKL012' },
    { id: 'CERT-005', diskName: 'SERVER-DEV-05', date: '11/01/2024', certificateId: 'SW-2024-005-MNO345' },
    { id: 'CERT-006', diskName: 'DESKTOP-HR-06', date: '10/01/2024', certificateId: 'SW-2024-006-PQR678' },
    { id: 'CERT-007', diskName: 'LAPTOP-SALES-07', date: '09/01/2024', certificateId: 'SW-2024-007-STU901' },
    { id: 'CERT-008', diskName: 'SERVER-BACKUP-08', date: '08/01/2024', certificateId: 'SW-2024-008-VWX234' },
    { id: 'CERT-009', diskName: 'WORKSTATION-09', date: '07/01/2024', certificateId: 'SW-2024-009-YZA567' },
    { id: 'CERT-010', diskName: 'LAPTOP-FINANCE-10', date: '06/01/2024', certificateId: 'SW-2024-010-BCD890' },
    { id: 'CERT-011', diskName: 'SERVER-WEB-11', date: '05/01/2024', certificateId: 'SW-2024-011-EFG123' },
    { id: 'CERT-012', diskName: 'DESKTOP-IT-12', date: '04/01/2024', certificateId: 'SW-2024-012-HIJ456' }
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const certificatesPerPage = 10

  // Calculate pagination
  const indexOfLastCertificate = currentPage * certificatesPerPage
  const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage
  const currentCertificates = certificates.slice(indexOfFirstCertificate, indexOfLastCertificate)
  const totalPages = Math.ceil(certificates.length / certificatesPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div style={{ minHeight: '80vh', padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Dashboard</h1>
          <p style={{ color: '#6B7280' }}>Manage your secure data wiping operations</p>
        </div>

        {/* User Info Section */}
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <User size={20} style={{ marginRight: '0.5rem', color: '#1DB954' }} />
            User Information
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <User size={18} style={{ marginRight: '0.75rem', color: '#6B7280' }} />
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Username</p>
                <p style={{ fontWeight: '500' }}>{userInfo.name}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Mail size={18} style={{ marginRight: '0.75rem', color: '#6B7280' }} />
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Email</p>
                <p style={{ fontWeight: '500' }}>{userInfo.email}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Key size={18} style={{ marginRight: '0.75rem', color: '#6B7280' }} />
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Product Key</p>
                <p style={{ fontWeight: '500', fontFamily: 'monospace' }}>{userInfo.productKey}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ background: '#DCFCE7', color: '#1DB954', width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <HardDrive size={24} />
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1DB954', marginBottom: '0.5rem' }}>
              {stats.totalDisksWiped}
            </h3>
            <p style={{ color: '#6B7280', fontWeight: '500' }}>Total Disks Wiped</p>
          </div>
          
          <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ background: '#DCFCE7', color: '#1DB954', width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <FileCheck size={24} />
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1DB954', marginBottom: '0.5rem' }}>
              {stats.certificatesGenerated}
            </h3>
            <p style={{ color: '#6B7280', fontWeight: '500' }}>Certificates Generated</p>
          </div>
        </div>

        {/* Certificates Table */}
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '1rem', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #E5E7EB' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
              <Shield size={20} style={{ marginRight: '0.5rem', color: '#1DB954' }} />
              Certificate History
            </h2>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '500', color: '#6B7280' }}>Disk Name Wiped</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '500', color: '#6B7280' }}>Date</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '500', color: '#6B7280' }}>Certificate ID</th>
                </tr>
              </thead>
              <tbody>
                {currentCertificates.map((cert, index) => (
                  <tr key={cert.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '500' }}>{cert.diskName}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6B7280' }}>{cert.date}</td>
                    <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontSize: '0.875rem', color: '#1DB954' }}>{cert.certificateId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
            <div style={{ color: '#6B7280', fontSize: '0.875rem' }}>
              Showing {indexOfFirstCertificate + 1} to {Math.min(indexOfLastCertificate, certificates.length)} of {certificates.length} certificates
            </div>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  background: currentPage === 1 ? '#F9FAFB' : 'white',
                  color: currentPage === 1 ? '#9CA3AF' : '#374151',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #D1D5DB',
                    borderRadius: '0.375rem',
                    background: currentPage === page ? '#1DB954' : 'white',
                    color: currentPage === page ? 'white' : '#374151',
                    cursor: 'pointer',
                    fontWeight: currentPage === page ? '600' : '400'
                  }}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  background: currentPage === totalPages ? '#F9FAFB' : 'white',
                  color: currentPage === totalPages ? '#9CA3AF' : '#374151',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard