'use client';
import { usePageContent } from '@/lib/cms/usePageContent';
import DynamicPageRenderer from '@/components/cms/DynamicPageRenderer';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CookiesPage() {
  const { page } = usePageContent('/cookies');

  if (page && page.blocks && page.blocks.length > 0) {
    return <DynamicPageRenderer blocks={page.blocks} />;
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-cyber text-white py-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 w-96 h-96 bg-cyber-cyan rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
        </div>
        
        <motion.div 
          className="container-custom relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6"><span className="text-gradient">Cookie</span> Policy</h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Understanding how we use cookies and tracking technologies
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
                <h2 className="heading-md text-gradient mb-4">What Are Cookies?</h2>
                <p className="text-text-secondary leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our site, and delivering relevant content and advertisements.
                </p>
              </div>

              {/* Types of Cookies */}
              <div>
                <h2 className="heading-md text-gradient mb-4">Types of Cookies We Use</h2>
                
                <div className="space-y-6">
                  {/* Essential Cookies */}
                  <div className="card-dark p-6 border-l-4 border-cyber-green">
                    <h3 className="heading-sm text-cyber-green mb-3">Essential Cookies</h3>
                    <p className="text-text-secondary leading-relaxed mb-3">
                      These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                    </p>
                    <div className="bg-dark-lighter p-4 rounded-lg font-mono text-sm">
                      <p className="text-text-muted mb-2">Examples:</p>
                      <ul className="list-disc list-inside space-y-1 text-text-secondary ml-2">
                        <li>Session management cookies</li>
                        <li>Authentication cookies</li>
                        <li>Security cookies</li>
                        <li>Load balancing cookies</li>
                      </ul>
                    </div>
                    <p className="text-text-muted text-sm mt-3">
                      <strong>Duration:</strong> Session or up to 1 year
                    </p>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="card-dark p-6 border-l-4 border-cyber-cyan">
                    <h3 className="heading-sm text-cyber-cyan mb-3">Analytics and Performance Cookies</h3>
                    <p className="text-text-secondary leading-relaxed mb-3">
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance and user experience.
                    </p>
                    <div className="bg-dark-lighter p-4 rounded-lg font-mono text-sm">
                      <p className="text-text-muted mb-2">Examples:</p>
                      <ul className="list-disc list-inside space-y-1 text-text-secondary ml-2">
                        <li>Google Analytics cookies (_ga, _gid, _gat)</li>
                        <li>Page view tracking</li>
                        <li>Traffic source tracking</li>
                        <li>User behavior analytics</li>
                      </ul>
                    </div>
                    <p className="text-text-muted text-sm mt-3">
                      <strong>Duration:</strong> Up to 2 years
                    </p>
                  </div>

                  {/* Functionality Cookies */}
                  <div className="card-dark p-6 border-l-4 border-cyber-blue">
                    <h3 className="heading-sm text-cyber-blue mb-3">Functionality Cookies</h3>
                    <p className="text-text-secondary leading-relaxed mb-3">
                      These cookies allow the website to remember choices you make (such as your language preference or region) and provide enhanced, personalized features.
                    </p>
                    <div className="bg-dark-lighter p-4 rounded-lg font-mono text-sm">
                      <p className="text-text-muted mb-2">Examples:</p>
                      <ul className="list-disc list-inside space-y-1 text-text-secondary ml-2">
                        <li>Language preference cookies</li>
                        <li>Theme preference cookies</li>
                        <li>Form auto-fill cookies</li>
                        <li>Cookie consent preferences</li>
                      </ul>
                    </div>
                    <p className="text-text-muted text-sm mt-3">
                      <strong>Duration:</strong> Up to 1 year
                    </p>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="card-dark p-6 border-l-4 border-cyber-purple">
                    <h3 className="heading-sm text-cyber-purple mb-3">Marketing and Advertising Cookies</h3>
                    <p className="text-text-secondary leading-relaxed mb-3">
                      These cookies are used to track visitors across websites to display relevant advertisements and measure the effectiveness of marketing campaigns.
                    </p>
                    <div className="bg-dark-lighter p-4 rounded-lg font-mono text-sm">
                      <p className="text-text-muted mb-2">Examples:</p>
                      <ul className="list-disc list-inside space-y-1 text-text-secondary ml-2">
                        <li>Google Ads cookies</li>
                        <li>LinkedIn Insight Tag</li>
                        <li>Facebook Pixel</li>
                        <li>Retargeting cookies</li>
                      </ul>
                    </div>
                    <p className="text-text-muted text-sm mt-3">
                      <strong>Duration:</strong> Up to 2 years
                    </p>
                  </div>
                </div>
              </div>

              {/* Third-Party Cookies */}
              <div>
                <h2 className="heading-md text-gradient mb-4">Third-Party Cookies</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  We use services from trusted third-party providers that may set cookies on your device. These include:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="card-cyber p-4">
                    <h4 className="text-cyber-green font-bold mb-2">Google Tag Manager</h4>
                    <p className="text-text-secondary text-sm">
                      Manages and deploys marketing tags and analytics tracking codes
                    </p>
                  </div>
                  <div className="card-cyber p-4">
                    <h4 className="text-cyber-green font-bold mb-2">Google Analytics</h4>
                    <p className="text-text-secondary text-sm">
                      Tracks and reports website traffic and user behavior
                    </p>
                  </div>
                  <div className="card-cyber p-4">
                    <h4 className="text-cyber-green font-bold mb-2">Microsoft Bookings</h4>
                    <p className="text-text-secondary text-sm">
                      Enables meeting scheduling and calendar integration
                    </p>
                  </div>
                  <div className="card-cyber p-4">
                    <h4 className="text-cyber-green font-bold mb-2">Social Media Platforms</h4>
                    <p className="text-text-secondary text-sm">
                      LinkedIn, Facebook, Instagram for social sharing features
                    </p>
                  </div>
                </div>
              </div>

              {/* Managing Cookies */}
              <div>
                <h2 className="heading-md text-gradient mb-4">Managing Your Cookie Preferences</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  You have control over which cookies you accept. Here are your options:
                </p>
                
                <h3 className="heading-sm text-cyber-green mb-3 mt-6">Cookie Consent Banner</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  When you first visit our website, you'll see a cookie consent banner where you can choose to accept or reject non-essential cookies. You can change your preferences at any time by clicking the cookie settings button at the bottom of any page.
                </p>

                <h3 className="heading-sm text-cyber-cyan mb-3 mt-6">Browser Settings</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Most web browsers allow you to control cookies through their settings. Here's how to manage cookies in popular browsers:
                </p>
                <ul className="list-disc list-inside space-y-2 text-text-secondary ml-4">
                  <li><strong className="text-cyber-green">Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong className="text-cyber-green">Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong className="text-cyber-green">Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong className="text-cyber-green">Microsoft Edge:</strong> Settings → Privacy, search, and services → Cookies and site data</li>
                </ul>

                <div className="bg-dark-lighter border border-cyber-red/30 p-4 rounded-lg mt-6">
                  <p className="text-cyber-red font-bold mb-2">⚠️ Important Note</p>
                  <p className="text-text-secondary text-sm">
                    Blocking or deleting cookies may impact your experience on our website. Some features may not function properly if essential cookies are disabled.
                  </p>
                </div>
              </div>

              {/* Do Not Track */}
              <div>
                <h2 className="heading-md text-gradient mb-4">Do Not Track Signals</h2>
                <p className="text-text-secondary leading-relaxed">
                  Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want your online activities tracked. Our website currently does not respond to DNT signals, but you can control tracking through your cookie preferences and browser settings.
                </p>
              </div>

              {/* Cookie Duration */}
              <div>
                <h2 className="heading-md text-gradient mb-4">How Long Do Cookies Last?</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Cookies can be either session cookies or persistent cookies:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="card-dark p-6">
                    <h4 className="text-cyber-green font-bold mb-2">Session Cookies</h4>
                    <p className="text-text-secondary text-sm mb-2">
                      Temporary cookies that expire when you close your browser
                    </p>
                    <p className="text-text-muted text-xs font-mono">Duration: Until browser is closed</p>
                  </div>
                  <div className="card-dark p-6">
                    <h4 className="text-cyber-cyan font-bold mb-2">Persistent Cookies</h4>
                    <p className="text-text-secondary text-sm mb-2">
                      Remain on your device until they expire or are manually deleted
                    </p>
                    <p className="text-text-muted text-xs font-mono">Duration: Days to years</p>
                  </div>
                </div>
              </div>

              {/* Updates */}
              <div>
                <h2 className="heading-md text-gradient mb-4">Updates to This Cookie Policy</h2>
                <p className="text-text-secondary leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this policy periodically to stay informed about how we use cookies.
                </p>
              </div>

              {/* Contact Information */}
              <div className="card-cyber p-8">
                <h2 className="heading-md text-gradient mb-4">Questions About Cookies?</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className="space-y-2 text-text-secondary">
                  <p><strong className="text-cyber-green">Email:</strong> <a href="mailto:privacy@rhcsolutions.com" className="text-cyber-cyan hover:text-cyber-green transition-colors">privacy@rhcsolutions.com</a></p>
                  <p><strong className="text-cyber-green">Phone:</strong> <a href="tel:+19176282365" className="text-cyber-cyan hover:text-cyber-green transition-colors">+1 (917) 628-2365</a></p>
                </div>
                <p className="text-text-muted text-sm mt-4">
                  For more information about how we handle your personal data, please see our <Link href="/privacy" className="text-cyber-cyan hover:text-cyber-green transition-colors underline">Privacy Policy</Link>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
