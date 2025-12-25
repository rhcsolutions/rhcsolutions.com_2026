'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaLaptop, FaShieldAlt, FaLock, FaCloud, FaUsers, FaHeadset, FaCheckCircle } from 'react-icons/fa';

export default function VirtualOfficePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-cyber text-white py-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-10" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/20 rounded-full blur-3xl"
        />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="heading-xl mb-6">
              Virtual Office <span className="text-gradient">Support</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Secure remote work solutions for the modern workforce
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <p className="text-xl text-text-secondary leading-relaxed">
              The modern workplace extends far beyond traditional office boundaries. RHC Solutions 
              enables your organization to embrace remote work securely and efficiently, with 
              comprehensive solutions that ensure productivity, security, and seamless collaboration 
              regardless of location.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
              className="card-cyber rounded-xl p-8 border border-cyber-purple/20"
            >
              <FaLaptop className="text-5xl text-cyber-purple mb-6" />
              <h3 className="heading-sm mb-4"><span className="text-gradient">Remote</span> Infrastructure</h3>
              <p className="text-text-secondary mb-4">
                Build and maintain robust infrastructure supporting distributed teams with secure, 
                reliable access to all necessary resources.
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Virtual desktop infrastructure (VDI)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Remote access VPN</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Cloud-based applications</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)' }}
              className="card-cyber rounded-xl p-8 border border-red-500/20"
            >
              <FaShieldAlt className="text-5xl text-red-500 mb-6" />
              <h3 className="heading-sm mb-4"><span className="text-gradient">Centralized</span> Security</h3>
              <p className="text-text-secondary mb-4">
                Maintain consistent security posture across all remote endpoints with centralized 
                management and monitoring.
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Endpoint protection</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Security policy enforcement</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Threat detection and response</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)' }}
              className="card-cyber rounded-xl p-8 border border-cyber-blue/20"
            >
              <FaLock className="text-5xl text-cyber-blue mb-6" />
              <h3 className="heading-sm mb-4"><span className="text-gradient">Access</span> Controls</h3>
              <p className="text-text-secondary mb-4">
                Implement granular access controls ensuring users have appropriate access to 
                resources based on role and location.
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Multi-factor authentication</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Role-based access control</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Conditional access policies</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)' }}
              className="card-cyber rounded-xl p-8 border border-cyber-cyan/20"
            >
              <FaCloud className="text-5xl text-cyber-cyan mb-6" />
              <h3 className="heading-sm mb-4"><span className="text-gradient">Collaboration</span> Tools</h3>
              <p className="text-text-secondary mb-4">
                Deploy and manage modern collaboration platforms enabling seamless teamwork 
                across distributed teams.
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Video conferencing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Team messaging and chat</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Document collaboration</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}
              className="card-cyber rounded-xl p-8 border border-cyber-green/20"
            >
              <FaUsers className="text-5xl text-cyber-green mb-6" />
              <h3 className="heading-sm mb-4"><span className="text-gradient">DR</span> Integration</h3>
              <p className="text-text-secondary mb-4">
                Ensure business continuity with disaster recovery solutions integrated into 
                your virtual office infrastructure.
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Automated backups</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Rapid recovery procedures</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Redundant connectivity</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(249, 115, 22, 0.3)' }}
              className="card-cyber rounded-xl p-8 border border-orange-500/20"
            >
              <FaHeadset className="text-5xl text-orange-500 mb-6" />
              <h3 className="heading-sm mb-4"><span className="text-gradient">User</span> Support</h3>
              <p className="text-text-secondary mb-4">
                Provide comprehensive support to remote workers ensuring they stay productive 
                and connected.
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>24/7 helpdesk support</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Remote troubleshooting</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>User training and onboarding</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-dark-lighter">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-lg mb-12 text-center"
          >
            Benefits of Virtual Office <span className="text-gradient">Solutions</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-dark p-8 rounded-xl hover:shadow-glow"
            >
              <h3 className="heading-sm mb-4"><span className="text-cyber-cyan">Enhanced</span> Productivity</h3>
              <p className="text-text-secondary">
                Enable employees to work effectively from anywhere with seamless access to 
                all necessary tools and resources.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card-dark p-8 rounded-xl hover:shadow-glow"
            >
              <h3 className="heading-sm mb-4"><span className="text-cyber-cyan">Cost</span> Savings</h3>
              <p className="text-text-secondary">
                Reduce overhead costs associated with physical office spaces while maintaining 
                operational efficiency.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card-dark p-8 rounded-xl hover:shadow-glow"
            >
              <h3 className="heading-sm mb-4"><span className="text-cyber-cyan">Talent</span> Flexibility</h3>
              <p className="text-text-secondary">
                Attract and retain top talent regardless of geographic location by offering 
                flexible work arrangements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="card-dark p-8 rounded-xl hover:shadow-glow"
            >
              <h3 className="heading-sm mb-4"><span className="text-cyber-cyan">Business</span> Resilience</h3>
              <p className="text-text-secondary">
                Maintain operations during disruptions with a distributed workforce and 
                cloud-based infrastructure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-cyber relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid opacity-10" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-green/20 rounded-full blur-3xl"
        />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="heading-lg mb-6">
              Enable Secure <span className="text-gradient">Remote Work</span>
            </h2>
            <p className="text-xl mb-8 text-text-secondary">
              Let's design a virtual office solution that empowers your distributed workforce
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://outlook.office.com/bookwithme/user/3b3090bb02994e5085e163adf76b191b@rhcsolutions.com/meetingtype/pJ4cLjK2VUKjf_7-AdLjwg2?anonymous&ep=mlink"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta"
              >
                Book a Meeting
              </a>
              <Link
                href="/services"
                className="btn-secondary"
              >
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
