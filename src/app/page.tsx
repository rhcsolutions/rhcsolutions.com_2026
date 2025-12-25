'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaUserShield, FaSyncAlt, FaHome, FaShieldAlt, FaUserTie, FaUserCog } from 'react-icons/fa';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-dark py-32 pt-40 border-b border-gray-100 dark:border-dark-lighter">
        <div className="container-custom text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            RHC Solutions: <span className="text-gradient">IT & Cybersecurity Experts</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-text-secondary mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Professional, reliable, and innovative IT solutions for modern businesses.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <Link href="/services" className="btn-primary px-8 py-3 text-lg">Our Services</Link>
            <Link href="/contact" className="btn-secondary px-8 py-3 text-lg">Contact Us</Link>
          </motion.div>
        </div>
      </section>

      {/* Core Services Overview */}
      <section className="section-padding bg-white dark:bg-dark">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Professional Services */}
            <motion.div className="card-cyber p-8 text-center" whileHover={{ y: -5 }}>
              <FaUserTie className="mx-auto text-4xl text-cyber-blue mb-4" />
              <h3 className="font-semibold text-lg mb-2">Professional Services</h3>
              <p className="text-text-secondary mb-2">Consulting, design, and implementation for complex IT projects.</p>
            </motion.div>
            {/* Business Continuity */}
            <motion.div className="card-cyber p-8 text-center" whileHover={{ y: -5 }}>
              <FaSyncAlt className="mx-auto text-4xl text-cyber-green mb-4" />
              <h3 className="font-semibold text-lg mb-2">Business Continuity</h3>
              <p className="text-text-secondary mb-2">Disaster recovery, resilience, and continuity planning.</p>
            </motion.div>
            {/* Virtual Office */}
            <motion.div className="card-cyber p-8 text-center" whileHover={{ y: -5 }}>
              <FaHome className="mx-auto text-4xl text-cyber-cyan mb-4" />
              <h3 className="font-semibold text-lg mb-2">Virtual Office</h3>
              <p className="text-text-secondary mb-2">Remote work solutions with secure access and collaboration.</p>
            </motion.div>
            {/* Cyber Security */}
            <motion.div className="card-cyber p-8 text-center" whileHover={{ y: -5 }}>
              <FaShieldAlt className="mx-auto text-4xl text-cyber-purple mb-4" />
              <h3 className="font-semibold text-lg mb-2">Cyber Security</h3>
              <p className="text-text-secondary mb-2">Comprehensive protection and compliance for your business.</p>
            </motion.div>
            {/* CISOaaS */}
            <motion.div className="card-cyber p-8 text-center" whileHover={{ y: -5 }}>
              <FaUserShield className="mx-auto text-4xl text-cyber-cyan mb-4" />
              <h3 className="font-semibold text-lg mb-2">CISOaaS</h3>
              <p className="text-text-secondary mb-2">Chief Information Security Officer as a Service.</p>
            </motion.div>
            {/* CIOaaS */}
            <motion.div className="card-cyber p-8 text-center" whileHover={{ y: -5 }}>
              <FaUserCog className="mx-auto text-4xl text-cyber-green mb-4" />
              <h3 className="font-semibold text-lg mb-2">CIOaaS</h3>
              <p className="text-text-secondary mb-2">Chief Information Officer as a Service.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Summary */}
      <section className="section-padding bg-white dark:bg-dark-lighter border-t border-gray-100 dark:border-dark">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">About RHC Solutions</h2>
          <p className="text-text-secondary text-lg mb-6">
            30+ years of IT excellence, innovation, and unwavering commitment to client success. We help organizations achieve their goals through tailored, secure, and scalable technology solutions.
          </p>
          <Link href="/about-us" className="btn-secondary">Learn More</Link>
        </div>
      </section>

      {/* Case Study Highlights */}
      <section className="section-padding bg-white dark:bg-dark">
        <div className="container-custom max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Case Study Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="card-cyber p-6" whileHover={{ y: -5 }}>
              <h3 className="font-semibold text-lg mb-2">Gaming SaaS: Multi-Platform Infrastructure</h3>
              <ul className="text-text-secondary text-sm list-disc ml-5">
                <li>99.99% uptime for 5M+ users</li>
                <li>Real-time data, regulatory compliance</li>
                <li>40% cost reduction</li>
              </ul>
            </motion.div>
            <motion.div className="card-cyber p-6" whileHover={{ y: -5 }}>
              <h3 className="font-semibold text-lg mb-2">Trading: Mission-Critical Platform</h3>
              <ul className="text-text-secondary text-sm list-disc ml-5">
                <li>Sub-millisecond latency</li>
                <li>Global network, 99.99% uptime</li>
                <li>Zero data loss, full compliance</li>
              </ul>
            </motion.div>
            <motion.div className="card-cyber p-6" whileHover={{ y: -5 }}>
              <h3 className="font-semibold text-lg mb-2">Aerospace: Secure Systems Integration</h3>
              <ul className="text-text-secondary text-sm list-disc ml-5">
                <li>Legacy modernization</li>
                <li>Zero security incidents</li>
                <li>Enhanced reliability</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-gradient-cyber text-white text-center">
        <div className="container-custom max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your IT?</h2>
          <p className="text-lg mb-8">Contact us for a consultation or to discuss your project needs.</p>
          <Link href="/contact" className="btn-cta px-8 py-3 text-lg">Contact Us</Link>
        </div>
      </section>
    </>
  );
}
