'use client';
import { usePageContent } from '@/lib/cms/usePageContent';
import DynamicPageRenderer from '@/components/cms/DynamicPageRenderer';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPage() {
  const { page } = usePageContent('/privacy');

  if (page && page.blocks && page.blocks.length > 0) {
    return <DynamicPageRenderer blocks={page.blocks} />;
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-cyber text-white py-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 w-96 h-96 bg-cyber-green rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
        </div>
        
        <motion.div 
          className="container-custom relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6"><span className="text-gradient">Privacy</span> Policy</h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Your privacy and data security are our top priorities
            </p>
            <p className="text-sm text-text-muted mt-4">Last updated: December 16, 2025</p>
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <motion.div 
            className="max-w-4xl mx-auto prose prose-invert prose-cyber"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-12">
              {/* Introduction */}
              <div>
                <h2 className="heading-md text-gradient mb-4">Introduction</h2>
                <p className="text-text-secondary leading-relaxed">
                  At RHC Solutions ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
              </div>

              {/* Information We Collect */}
              <div>
                <h2 className="heading-md text-gradient mb-4">Information We Collect</h2>
                
                <h3 className="heading-sm text-cyber-green mb-3 mt-6">Personal Information</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                  <li>Fill out contact forms or request quotes</li>
                  <li>Subscribe to our newsletters or updates</li>
                  <li>Schedule meetings or consultations</li>
                  <li>Create an account or register for services</li>
                  <li>Communicate with us via email, phone, or messaging platforms</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mt-4">
                  This information may include: name, email address, phone number, company name, job title, and any other information you choose to provide.
                </p>

                <h3 className="heading-sm text-cyber-cyan mb-3 mt-6">Automatically Collected Information</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  When you visit our website, we automatically collect certain information about your device and browsing activity, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                  <li>IP address and geographic location</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referral source and exit pages</li>
                  <li>Device identifiers and characteristics</li>
                </ul>
              </div>

              {/* How We Use Your Information */}
              <div>
                <h2 className="heading-md text-gradient mb-4">How We Use Your Information</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We use the collected information for various purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                  <li>To provide, operate, and maintain our services</li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To send you service-related communications and updates</li>
                  <li>To improve and optimize our website and services</li>
                  <li>To analyze usage patterns and trends</li>
                  <li>To detect, prevent, and address technical issues or security threats</li>
                  <li>To comply with legal obligations and enforce our terms</li>
                  <li>To send marketing communications (with your consent)</li>
                </ul>
              </div>

              {/* Information Sharing */}
              <div>
                <h2 className="heading-md text-gradient mb-4">Information Sharing and Disclosure</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                  <li><strong className="text-cyber-green">Service Providers:</strong> With trusted third-party vendors who assist us in operating our website and providing services</li>
                  <li><strong className="text-cyber-green">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong className="text-cyber-green">Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong className="text-cyber-green">With Your Consent:</strong> When you have given us explicit permission to share your information</li>
                </ul>
              </div>

              {/* Cookies and Tracking */}
              <div>
                <h2 className="heading-md text-gradient mb-4">Cookies and Tracking Technologies</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our website. For detailed information about our use of cookies, please refer to our <Link href="/cookies" className="text-cyber-cyan hover:text-cyber-green transition-colors underline">Cookie Policy</Link>.
                </p>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="heading-md text-gradient mb-4">Data Security</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and audits</li>
                  <li>Access controls and authentication procedures</li>
                  <li>Employee training on data protection practices</li>
                  <li>Incident response and breach notification procedures</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mt-4">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
                </p>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="heading-md text-gradient mb-4">Your Rights and Choices</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                  <li><strong className="text-cyber-green">Access:</strong> Request access to the personal information we hold about you</li>
                  <li><strong className="text-cyber-green">Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong className="text-cyber-green">Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong className="text-cyber-green">Objection:</strong> Object to the processing of your information</li>
                  <li><strong className="text-cyber-green">Data Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong className="text-cyber-green">Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mt-4">
                  To exercise these rights, please contact us at <a href="mailto:privacy@rhcsolutions.com" className="text-cyber-cyan hover:text-cyber-green transition-colors">privacy@rhcsolutions.com</a>.
                </p>
              </div>

              {/* Data Retention */}
              <div>
                <h2 className="heading-md text-gradient mb-4">Data Retention</h2>
                <p className="text-text-secondary leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
                </p>
              </div>

              {/* International Transfers */}
              <div>
                <h2 className="heading-md text-gradient mb-4">International Data Transfers</h2>
                <p className="text-text-secondary leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
                </p>
              </div>

              {/* Children's Privacy */}
              <div>
                <h2 className="heading-md text-gradient mb-4">Children's Privacy</h2>
                <p className="text-text-secondary leading-relaxed">
                  Our services are not directed to children under the age of 16. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </div>

              {/* Changes to Policy */}
              <div>
                <h2 className="heading-md text-gradient mb-4">Changes to This Privacy Policy</h2>
                <p className="text-text-secondary leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
                </p>
              </div>

              {/* Contact Information */}
              <div className="card-cyber p-8">
                <h2 className="heading-md text-gradient mb-4">Contact Us</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-text-secondary">
                  <p><strong className="text-cyber-green">Email:</strong> <a href="mailto:privacy@rhcsolutions.com" className="text-cyber-cyan hover:text-cyber-green transition-colors">privacy@rhcsolutions.com</a></p>
                  <p><strong className="text-cyber-green">Phone:</strong> <a href="tel:+19176282365" className="text-cyber-cyan hover:text-cyber-green transition-colors">+1 (917) 628-2365</a></p>
                  <p><strong className="text-cyber-green">Address:</strong> RHC Solutions, New York, NY, USA</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
