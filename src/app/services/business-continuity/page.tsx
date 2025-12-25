'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFileAlt, FaServer, FaCheckCircle, FaClock, FaChartLine } from 'react-icons/fa';

export default function BusinessContinuityPage() {
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
              Business Continuity & <span className="text-gradient">Disaster Recovery</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Strategic planning and preparation for disruptions to ensure business resilience
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
              Every organization faces the risk of disruption—from natural disasters to cyber attacks, 
              equipment failures to human error. RHC Solutions helps you prepare for the unexpected with 
              comprehensive business continuity and disaster recovery solutions that minimize downtime 
              and protect your critical business operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}
              className="card-cyber rounded-xl p-8 border border-cyber-green/20"
            >
              <FaFileAlt className="text-5xl text-cyber-green mb-6" />
              <h3 className="heading-sm mb-4"><span className="text-gradient">Business Continuity</span> Planning</h3>
              <p className="text-text-secondary mb-4">
                Comprehensive plans to maintain essential functions during and after a disaster or disruption.
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Business impact analysis</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Recovery strategies</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Plan development and documentation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Training and awareness</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)' }}
              className="card-cyber rounded-xl p-8 border border-cyber-blue/20"
            >
              <FaServer className="text-5xl text-cyber-blue mb-6" />
              <h3 className="heading-sm mb-4"><span className="text-gradient">Disaster</span> Recovery</h3>
              <p className="text-text-secondary mb-4">
                Technical solutions to restore IT systems and data after a disruption or disaster event.
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Backup and replication</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Recovery site setup</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Failover automation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Recovery procedures</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
              className="card-cyber rounded-xl p-8 border border-cyber-purple/20"
            >
              <FaCheckCircle className="text-5xl text-cyber-purple mb-6" />
              <h3 className="heading-sm mb-4"><span className="text-gradient">Testing</span> & Validation</h3>
              <p className="text-text-secondary mb-4">
                Regular testing to ensure your plans work when you need them most.
              </p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Tabletop exercises</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Simulation drills</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Full failover tests</span>
                </li>
                <li className="flex items-start space-x-2">
                  <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <span>Results analysis</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="section-padding bg-dark-lighter">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-lg mb-12 text-center"
          >
            Understanding Recovery <span className="text-gradient">Objectives</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-dark p-8 rounded-xl hover:shadow-glow"
            >
              <FaClock className="text-4xl text-cyber-cyan mb-4" />
              <h3 className="heading-sm mb-4"><span className="text-cyber-cyan">Recovery Time</span> Objective (RTO)</h3>
              <p className="text-text-secondary">
                The maximum acceptable length of time your systems can be down after a disaster. 
                We help you define and achieve RTOs that align with your business requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card-dark p-8 rounded-xl hover:shadow-glow"
            >
              <FaChartLine className="text-4xl text-cyber-cyan mb-4" />
              <h3 className="heading-sm mb-4"><span className="text-cyber-cyan">Recovery Point</span> Objective (RPO)</h3>
              <p className="text-text-secondary">
                The maximum acceptable amount of data loss measured in time. We design backup 
                and replication strategies to meet your RPO requirements.
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
              Ensure Your Business Can Weather Any <span className="text-gradient">Storm</span>
            </h2>
            <p className="text-xl mb-8 text-text-secondary">
              Let's develop a comprehensive continuity and recovery strategy for your organization
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
