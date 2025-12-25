'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFileAlt, FaFlask, FaCheckCircle, FaFileContract, FaCogs, FaRobot } from 'react-icons/fa';

const services = [
  {
    icon: FaFileAlt,
    title: 'High-Level & Low-Level Design',
    description: 'Comprehensive architecture and detailed technical design documentation for complex IT systems. We create scalable, maintainable designs that align with your business objectives and technical requirements.',
    benefits: [
      'Scalable architecture planning',
      'Detailed technical specifications',
      'Risk assessment and mitigation',
      'Technology stack recommendations',
      'Integration patterns and best practices',
    ],
  },
  {
    icon: FaFlask,
    title: 'Proof of Concept (POC)',
    description: 'Validate your ideas and technologies before full-scale implementation. Our POC services help you make informed decisions by demonstrating feasibility and identifying potential challenges early.',
    benefits: [
      'Technology validation',
      'Risk reduction',
      'Performance benchmarking',
      'Cost-benefit analysis',
      'Stakeholder demonstrations',
    ],
  },
  {
    icon: FaCheckCircle,
    title: 'Acceptance Testing & Validation',
    description: 'Rigorous testing protocols to ensure your systems meet all requirements and perform as expected. We develop comprehensive test strategies covering functional, performance, and security aspects.',
    benefits: [
      'Comprehensive test planning',
      'Automated test execution',
      'Performance validation',
      'Security testing',
      'Quality assurance reporting',
    ],
  },
  {
    icon: FaFileContract,
    title: 'Tender Preparation',
    description: 'Expert assistance in preparing technical tenders and proposals. We help you articulate your requirements clearly and evaluate vendor responses effectively.',
    benefits: [
      'Requirements documentation',
      'Technical specifications',
      'Vendor evaluation criteria',
      'Proposal analysis',
      'Contract negotiation support',
    ],
  },
  {
    icon: FaCogs,
    title: 'Multi-Platform Systems',
    description: 'Design and integrate complex systems spanning multiple platforms and technologies. We ensure seamless interoperability and efficient data flow across your entire IT ecosystem.',
    benefits: [
      'Cross-platform integration',
      'API design and development',
      'Data synchronization',
      'Legacy system integration',
      'Microservices architecture',
    ],
  },
  {
    icon: FaRobot,
    title: 'Testing & Automation',
    description: 'Implement comprehensive testing frameworks and automation strategies to improve quality, reduce time-to-market, and minimize human error in your development and deployment processes.',
    benefits: [
      'Test automation frameworks',
      'CI/CD pipeline integration',
      'Regression testing',
      'Load and performance testing',
      'Test reporting and analytics',
    ],
  },
];

export default function ProfessionalServicesPage() {
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
              Professional <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Expert IT consulting services for complex system design, implementation, and testing
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
              RHC Solutions provides comprehensive professional services covering the entire IT project lifecycle. 
              From initial concept and design through implementation, testing, and deployment, our experienced 
              consultants deliver the expertise you need to succeed.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                    <div className="flex-shrink-0 w-14 h-14 bg-cyber-blue/10 rounded-lg flex items-center justify-center text-cyber-blue text-2xl border border-cyber-blue/20">
                      <Icon />
                    </div>
                    <div>
                      <h3 className="heading-sm mb-2">
                        <span className="text-gradient">{service.title}</span>
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-text-secondary mb-6">{service.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-cyber-cyan text-sm uppercase tracking-wide mb-3">Key Benefits</h4>
                    {service.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start space-x-2">
                        <FaCheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-text-secondary">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-dark-lighter">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg mb-12 text-center"
            >
              Why Choose <span className="text-gradient">RHC Solutions</span>?
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="card-dark p-8 rounded-xl hover:shadow-glow"
              >
                <h3 className="heading-sm mb-4"><span className="text-cyber-cyan">Experienced</span> Team</h3>
                <p className="text-text-secondary">
                  Our consultants bring decades of hands-on experience across diverse industries 
                  and technologies, ensuring you receive practical, proven solutions.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="card-dark p-8 rounded-xl hover:shadow-glow"
              >
                <h3 className="heading-sm mb-4"><span className="text-cyber-cyan">Vendor</span> Neutral</h3>
                <p className="text-text-secondary">
                  We recommend solutions based solely on your needs, not vendor partnerships. 
                  Our independence ensures you get the best technology for your situation.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="card-dark p-8 rounded-xl hover:shadow-glow"
              >
                <h3 className="heading-sm mb-4"><span className="text-cyber-cyan">Best</span> Practices</h3>
                <p className="text-text-secondary">
                  We apply industry-leading methodologies and frameworks to every engagement, 
                  ensuring quality, consistency, and maintainability.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="card-dark p-8 rounded-xl hover:shadow-glow"
              >
                <h3 className="heading-sm mb-4"><span className="text-cyber-cyan">Knowledge</span> Transfer</h3>
                <p className="text-text-secondary">
                  We don't just deliver solutions—we empower your team with the knowledge 
                  and skills to maintain and evolve them over time.
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
              Let's Discuss Your <span className="text-gradient">Project</span>
            </h2>
            <p className="text-xl mb-8 text-text-secondary">
              Schedule a consultation to explore how our professional services can support your IT initiatives
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
