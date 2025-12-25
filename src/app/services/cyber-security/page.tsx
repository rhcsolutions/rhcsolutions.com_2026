'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUserShield, FaFileAlt, FaExclamationTriangle, FaBug, FaCheckCircle } from 'react-icons/fa';

const complianceFrameworks = [
  'SOX (Sarbanes-Oxley)',
  'PCI DSS',
  'ISO 27001',
  'NIST Cybersecurity Framework',
  'HIPAA',
  'GDPR',
];

const services = [
  {
    icon: FaShieldAlt,
    title: 'Threat Defense & Prevention',
    description: 'Multi-layered security approach to protect your organization from evolving cyber threats.',
    features: [
      'Firewall and intrusion detection',
      'Endpoint protection',
      'Email and web security',
      'DDoS mitigation',
      'Advanced threat analytics',
    ],
  },
  {
    icon: FaFileAlt,
    title: 'Compliance Management',
    description: 'Comprehensive compliance programs tailored to your industry regulations and standards.',
    features: [
      'Gap analysis and remediation',
      'Policy and procedure development',
      'Compliance audits and reporting',
      'Evidence collection and management',
      'Continuous compliance monitoring',
    ],
  },
  {
    icon: FaExclamationTriangle,
    title: 'Risk Assessment',
    description: 'Systematic identification and evaluation of security risks to your organization.',
    features: [
      'Vulnerability assessments',
      'Penetration testing',
      'Risk quantification',
      'Control effectiveness review',
      'Risk mitigation planning',
    ],
  },
  {
    icon: FaLock,
    title: 'Security Controls',
    description: 'Implementation of robust technical and administrative controls to safeguard your assets.',
    features: [
      'Access control systems',
      'Encryption implementation',
      'Security monitoring',
      'Data loss prevention',
      'Security awareness training',
    ],
  },
  {
    icon: FaBug,
    title: 'Incident Response',
    description: 'Rapid response and recovery services to minimize the impact of security incidents.',
    features: [
      'Incident response planning',
      'Forensic analysis',
      'Threat containment',
      'Recovery coordination',
      'Post-incident review',
    ],
  },
  {
    icon: FaUserShield,
    title: 'Identity & Access Management',
    description: 'Comprehensive IAM solutions to ensure the right people have the right access at the right time.',
    features: [
      'Single Sign-On (SSO)',
      'Multi-factor authentication',
      'Privileged access management',
      'Identity governance',
      'Access certification',
    ],
  },
];

export default function CyberSecurityPage() {
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
              Cyber Security & <span className="text-gradient">Compliance</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Robust defense against threats and comprehensive compliance management
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
              In today's threat landscape, comprehensive cyber security is not optional—it's essential. 
              RHC Solutions provides end-to-end security services that protect your organization from 
              threats while ensuring compliance with industry regulations and standards.
            </p>
          </motion.div>

          {/* Compliance Frameworks */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg mb-8 text-center"
            >
              Compliance Frameworks We <span className="text-gradient">Support</span>
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {complianceFrameworks.map((framework, index) => (
                <motion.div
                  key={framework}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
                  className="card-cyber rounded-lg p-4 text-center border border-cyber-blue/20"
                >
                  <p className="text-sm font-semibold text-cyber-cyan">{framework}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)' }}
                  className="card-cyber rounded-xl p-8"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 text-2xl border border-red-500/20">
                      <Icon />
                    </div>
                    <div>
                      <h3 className="heading-sm mb-2"><span className="text-gradient">{service.title}</span></h3>
                    </div>
                  </div>
                  
                  <p className="text-text-secondary mb-6">{service.description}</p>

                  <div className="space-y-2">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start space-x-2">
                        <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Approach */}
      <section className="section-padding bg-dark-lighter">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg mb-12 text-center"
            >
              Our Security <span className="text-gradient">Approach</span>
            </motion.h2>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="card-dark p-8 rounded-xl border-l-4 border-cyber-cyan hover:shadow-glow"
              >
                <h3 className="heading-sm mb-3"><span className="text-cyber-cyan">Defense</span> in Depth</h3>
                <p className="text-text-secondary">
                  Multiple layers of security controls throughout your IT infrastructure to ensure 
                  comprehensive protection against diverse threat vectors.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="card-dark p-8 rounded-xl border-l-4 border-cyber-cyan hover:shadow-glow"
              >
                <h3 className="heading-sm mb-3"><span className="text-cyber-cyan">Risk-Based</span> Approach</h3>
                <p className="text-text-secondary">
                  Prioritize security investments based on actual risk to your business, ensuring 
                  resources are focused where they provide the most value.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="card-dark p-8 rounded-xl border-l-4 border-cyber-cyan hover:shadow-glow"
              >
                <h3 className="heading-sm mb-3"><span className="text-cyber-cyan">Continuous</span> Improvement</h3>
                <p className="text-text-secondary">
                  Regular assessments, monitoring, and updates to ensure your security posture 
                  evolves with the threat landscape.
                </p>
              </motion.div>
            </div>
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
              Protect Your <span className="text-gradient">Organization</span> Today
            </h2>
            <p className="text-xl mb-8 text-text-secondary">
              Schedule a security assessment to identify vulnerabilities and strengthen your defenses
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
