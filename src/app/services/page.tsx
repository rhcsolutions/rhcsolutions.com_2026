'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCloud, FaShieldAlt, FaCogs, FaServer, FaUsers, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const services = [
  {
    icon: FaCogs,
    title: 'Professional Services',
    description: 'Comprehensive IT consulting including High-Level and Low-Level Design, Proof of Concept, Acceptance Testing, tender preparation, multi-platform systems, and testing automation.',
    href: '/services/professional-services',
    features: ['System Design (HLD/LLD)', 'POC & ATP', 'Tender Preparation', 'Multi-Platform Integration', 'Testing & Automation'],
    gradient: 'from-cyber-blue to-cyber-cyan',
  },
  {
    icon: FaCloud,
    title: 'Cloud & Infrastructure',
    description: 'Full lifecycle management on AWS, Azure, and GCP. Expert cloud migrations, datacenter operations, DevOps implementation, and infrastructure design.',
    href: '/services/cloud-infrastructure',
    features: ['AWS, Azure, GCP', 'Cloud Migration', 'DevOps & CI/CD', 'Infrastructure Design', 'Datacenter Operations'],
    gradient: 'from-cyber-cyan to-cyber-purple',
  },
  {
    icon: FaShieldAlt,
    title: 'Cyber Security & Compliance',
    description: 'Robust defense strategies, comprehensive compliance management (SOX, PCI DSS, ISO 27001, NIST), risk assessments, and security control implementation.',
    href: '/services/cyber-security',
    features: ['Threat Defense', 'Compliance (SOX, PCI DSS, ISO)', 'Risk Assessment', 'Security Controls', 'Incident Response'],
    gradient: 'from-cyber-red to-cyber-purple',
  },
  {
    icon: FaServer,
    title: 'Business Continuity & DR',
    description: 'Strategic planning for business disruptions, comprehensive BCP/DR solutions, regular testing programs, and organizational resilience building.',
    href: '/services/business-continuity',
    features: ['BCP Planning', 'Disaster Recovery', 'Resilience Testing', 'Backup Solutions', 'Crisis Management'],
    gradient: 'from-cyber-green to-cyber-cyan',
  },
  {
    icon: FaUsers,
    title: 'Virtual Office Support',
    description: 'Secure remote work solutions with centralized security management, comprehensive access controls, and integrated disaster recovery capabilities.',
    href: '/services/virtual-office',
    features: ['Remote Work Security', 'Access Controls', 'Centralized Management', 'DR Integration', 'Collaboration Tools'],
    gradient: 'from-cyber-purple to-cyber-blue',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-cyber text-white py-32 pt-40 overflow-hidden">
        {/* Background Effects */}
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
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl"
        />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-cyber-blue/10 border border-cyber-blue/30 px-4 py-2 rounded-full mb-6">
                <span className="text-mono text-cyber-blue font-bold text-sm">COMPREHENSIVE IT SOLUTIONS</span>
              </div>
              <h1 className="heading-xl mb-6">
                Our <span className="text-gradient">Services</span>
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary">
                Our mission is to deliver top-notch professional services tailored to your needs
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-dark relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-cyber-grid opacity-5" />

        <div className="container-custom relative z-10">
          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                >
                  {/* Icon & Title Column */}
                  <div className={`w-full lg:w-5/12 ${isEven ? '' : 'lg:text-right'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={`inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br ${service.gradient} 
                               rounded-2xl text-white text-6xl mb-6 shadow-glow`}
                    >
                      <Icon />
                    </motion.div>
                    <h2 className="heading-md mb-4">
                      <span className="text-gradient">{service.title}</span>
                    </h2>
                    <p className="text-lg text-text-secondary mb-6 leading-relaxed">{service.description}</p>
                    <Link
                      href={service.href}
                      className="btn-primary inline-flex items-center space-x-2 group"
                    >
                      <span>Learn More</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Features Column */}
                  <div className="w-full lg:w-7/12">
                    <div className="card-cyber p-8">
                      <div className={`h-1 w-20 bg-gradient-to-r ${service.gradient} rounded-full mb-6`} />
                      <h3 className="text-xl font-bold text-text-primary mb-6 text-mono">KEY CAPABILITIES</h3>
                      <ul className="space-y-4">
                        {service.features.map((feature, idx) => (
                          <motion.li
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + idx * 0.1, duration: 0.5 }}
                            className="flex items-start space-x-3 group/item"
                          >
                            <FaCheckCircle className="text-cyber-green text-xl flex-shrink-0 mt-0.5 
                                                    group-hover/item:scale-110 transition-transform" />
                            <span className="text-text-primary text-lg">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-cyber text-white relative overflow-hidden">
        {/* Animated Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 right-1/4 w-96 h-96 bg-cyber-cyan/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyber-green/20 rounded-full blur-3xl"
        />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="heading-lg mb-6">
              Ready to <span className="text-gradient">Get Started</span>?
            </h2>
            <p className="text-xl mb-8 text-text-secondary">
              Let's discuss how our services can help transform your IT infrastructure
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
              <Link href="/contact">
                <button className="btn-secondary">
                  Contact Us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
