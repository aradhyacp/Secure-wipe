import { useState } from 'react'
import { ChevronDown, ChevronUp, Shield, FileCheck, Monitor, Lock } from 'lucide-react'

function FAQ() {
  const [openItems, setOpenItems] = useState(new Set([0])) // First item open by default

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

const faqData = [
    {
        category: "General",
        icon: Shield,
        questions: [
            {
                question: "What is SecureWipe and how does it work?",
                answer: "SecureWipe is a NIST SP 800-88 Rev. 1 compliant data sanitization platform designed for secure IT asset recycling. It uses military-grade algorithms to permanently destroy data on storage devices, making recovery impossible. The platform provides cryptographically signed certificates as proof of data destruction, addressing India's ₹50,000 crore e-waste challenge through trustworthy data sanitization."
            },
            {
                question: "Which devices and operating systems are supported?",
                answer: "SecureWipe supports multiple platforms including Windows, Linux, and MacOS devices. It works with various storage types including HDDs, SSDs, USB drives, SD cards, and mobile device internal storage. The software can run as a bootable solution for offline wiping or as an application within the operating system."
            },
            {
                question: "Is SecureWipe free to use?",
                answer: "Yes, SecureWipe is free for everyone."
            }
        ]
    },
    {
        category: "Security & Compliance",
        icon: Lock,
        questions: [
            {
                question: "What security standards does SecureWipe comply with?",
                answer: "SecureWipe is fully compliant with NIST SP 800-88 Rev. 1, DoD 5220.22-M, and supports GDPR requirements for data destruction. The platform implements Clear, Purge, and Destroy methods as defined by NIST guidelines. All wiping operations are documented with cryptographic proof for regulatory compliance and audit purposes."
            },
            {
                question: "How can I verify the authenticity of a SecureWipe certificate?",
                answer: "Every SecureWipe certificate is digitally signed using military-grade cryptographic algorithms. You can verify certificates through our online verification portal by entering the certificate ID. The verification process checks the digital signature, timestamp, and ensures the certificate hasn't been tampered with."
            },
            {
                question: "What wiping methods are available?",
                answer: "SecureWipe offers multiple sanitization methods including NIST Clear (single overwrite), NIST Purge (cryptographic erase for SSDs), DoD 3-pass, DoD 7-pass, and custom patterns. The platform automatically selects the most appropriate method based on the storage device type and security requirements."
            }
        ]
    },
    {
        category: "Technical",
        icon: Monitor,
        questions: [
            {
                question: "How long does the wiping process take?",
                answer: "Wiping time depends on storage capacity, device type, and selected method. Typical times: 500GB HDD with single pass takes 2-4 hours, SSDs using cryptographic erase complete in minutes, and 3-pass DoD method takes 6-12 hours for 1TB drives. Real-time progress monitoring shows estimated completion times."
            },
            {
                question: "What is the methodology behind SecureWipe's data sanitization?",
                answer: "SecureWipe utilizes industry-standard algorithms and follows NIST SP 800-88 Rev. 1 guidelines for data sanitization. Depending on the device and user requirements, it applies methods such as single or multiple overwrites, cryptographic erasure for SSDs, and verification of wiped sectors. Each operation is logged and verified to ensure complete and irreversible data destruction."
            }
        ]
    },
    {
        category: "Certificates & Verification",
        icon: FileCheck,
        questions: [
            {
                question: "What information is included in the destruction certificate?",
                answer: "SecureWipe certificates include device details (make, model, serial number), storage capacity, wiping method used, start/end timestamps, sector-by-sector verification logs, cryptographic hash of the wiping process, and a tamper-proof digital signature. Certificates are PDF documents that can be printed or stored digitally."
            },
            {
                question: "How long are certificates valid and stored?",
                answer: "Certificates never expire and remain permanently valid. SecureWipe maintains certificate records in our secure database for 10 years minimum. Certificate verification through our online portal is available 24/7. For enterprise customers, we provide extended storage and backup options for regulatory compliance."
            },
            {
                question: "Can certificates be used for legal and regulatory compliance?",
                answer: "Yes, SecureWipe certificates are legally admissible documents that satisfy data protection regulations including GDPR Article 17 (Right to Erasure), Indian IT Act requirements, and industry standards like ISO 27001. The cryptographic signatures and detailed audit trails provide court-admissible proof of data destruction."
            }
        ]
    }
]

  return (
    <div style={{ minHeight: '80vh', paddingTop: '2rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
            Everything you need to know about SecureWipe's data sanitization platform,
            security standards, and certification process.
          </p>
        </div>

        {/* FAQ Categories */}
        {faqData.map((category, categoryIndex) => (
          <div key={categoryIndex} style={{ marginBottom: '3rem' }}>
            {/* Category Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '2px solid #E5E7EB'
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                backgroundColor: '#DCFCE7',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem'
              }}>
                <category.icon size={20} style={{ color: '#1DB954' }} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1DB954' }}>
                {category.category}
              </h2>
            </div>

            {/* FAQ Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {category.questions.map((item, itemIndex) => {
                const globalIndex = categoryIndex * 100 + itemIndex
                const isOpen = openItems.has(globalIndex)
                
                return (
                  <div
                    key={itemIndex}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.75rem',
                      overflow: 'hidden',
                      boxShadow: isOpen ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    <button
                      onClick={() => toggleItem(globalIndex)}
                      style={{
                        width: '100%',
                        padding: '1.5rem',
                        textAlign: 'left',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '1.125rem',
                        fontWeight: '500',
                        color: '#0F1724'
                      }}
                    >
                      <span>{item.question}</span>
                      {isOpen ? (
                        <ChevronUp size={20} style={{ color: '#1DB954', flexShrink: 0 }} />
                      ) : (
                        <ChevronDown size={20} style={{ color: '#6B7280', flexShrink: 0 }} />
                      )}
                    </button>
                    
                    {isOpen && (
                      <div style={{
                        padding: '0 1.5rem 1.5rem',
                        borderTop: '1px solid #F3F4F6',
                        backgroundColor: '#F8FAFC'
                      }}>
                        <p style={{
                          color: '#6B7280',
                          lineHeight: '1.6',
                          margin: '1rem 0 0 0'
                        }}>
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Contact Support Section */}
        {/* <div style={{
          backgroundColor: '#1E293B',
          borderRadius: '1rem',
          padding: '3rem',
          textAlign: 'center',
          color: 'white',
          marginTop: '4rem'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Still have questions?
          </h3>
          <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>
            Our technical support team is ready to help with any questions about
            secure data wiping, compliance requirements, or certificate verification.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="mailto:support@securewipe.com"
              className="btn btn-primary"
              style={{ textDecoration: 'none' }}
            >
              Contact Support
            </a>
            <a
              href="#"
              className="btn btn-outline"
              style={{ 
                textDecoration: 'none',
                borderColor: '#94A3B8',
                color: '#94A3B8'
              }}
            >
              View Documentation
            </a>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default FAQ