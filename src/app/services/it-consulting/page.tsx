'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaTools, FaCogs, FaChartLine, FaLightbulb, FaRocket, FaCheckCircle } from 'react-icons/fa';

const consultingAreas = [
  'Strategy & Roadmaps',
  'Architecture Design',
  'Technology Assessment',
  'Risk Management',
  'Project Management',
  'Change Management',
];

const services = [
  {
    icon: FaProjectDiagram,
    title: 'Strategy & Architecture',
    description: 'Develop comprehensive IT strategies and solution architectures aligned with your business objectives.',
    features: [
      'Enterprise architecture design',
      'Technology roadmap development',
      'Solution design and planning',
      'Systems integration strategy',
      'Digital transformation planning',
    ],
  },
  {
    icon: FaTools,
    title: 'Proof of Concept',
    description: 'Validate innovative solutions through controlled POC implementations to de-risk major initiatives.',
    features: [
      'Feasibility assessment',
      'Technology validation',
      'Prototype development',
      'Cost-benefit analysis',
      'Pilot program management',
    ],
  },
  {
    icon: FaCogs,
    title: 'Implementation & Testing',
    description: 'End-to-end project delivery with comprehensive testing and operational handover.',
    features: [
      'Project implementation',
      'Quality assurance testing',
      'User acceptance testing',
      'Performance optimization',
      'Operations handover',
    ],
  },
  {
    icon: FaChartLine,
    title: 'Business Process Optimization',
    description: 'Streamline operations and improve efficiency through process analysis and redesign.',
    features: [
      'Process mapping and analysis',
      'Workflow optimization',
      'Automation recommendations',
      'Performance metrics',
      'Continuous improvement planning',
    ],
  },
  {
    icon: FaLightbulb,
    title: 'Technical Advisory',
    description: 'Expert guidance on technology decisions, vendor selection, and best practices.',
    features: [
      'Technology assessment',
      'Vendor evaluation and selection',
      'Best practice recommendations',
      'Capability analysis',
      'Technical due diligence',
    ],
  },
  {
    icon: FaRocket,
    title: 'Change Management',
    description: 'Facilitate organizational change and successful adoption of new systems and processes.',
    features: [
      'Change strategy development',
      'Stakeholder engagement',
      'Training program design',
      'Adoption management',
      'Communication planning',
    ],
  },
];

export default function ITConsultingPage() {
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
              IT Consulting & <span className="text-gradient">Professional Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Strategic guidance and expert execution for digital transformation and IT initiatives
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
              Navigate complex IT landscapes with confidence. RHC Solutions delivers comprehensive consulting 
              services from strategy and architecture through implementation and optimization, helping your 
              organization make informed technology decisions and execute successful digital transformation initiatives.
            </p>
          </motion.div>

          {/* Consulting Areas */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg mb-8 text-center"
            >
              Consulting <span className="text-gradient">Areas</span>
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {consultingAreas.map((area, index) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' }}
                  className="card-cyber rounded-lg p-4 text-center border border-cyber-blue/20"
                >
                  <p className="text-sm font-semibold text-cyber-cyan">{area}</p>
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
                    <div className="flex-shrink-0 w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 text-2xl border border-blue-500/20">
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

      {/* Consulting Approach */}
      <section className="section-padding bg-dark-lighter">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg mb-12 text-center"
            >
              Our Consulting <span className="text-gradient">Approach</span>
            </motion.h2>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="card-dark p-8 rounded-xl border-l-4 border-cyber-cyan hover:shadow-glow"
              >
                <h3 className="heading-sm mb-3"><span className="text-cyber-cyan">Business-Focused</span> Perspective</h3>
                <p className="text-text-secondary">
                  Every recommendation is tied to business outcomes. We focus on solutions that deliver 
                  measurable value and align technology investments with your strategic objectives.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="card-dark p-8 rounded-xl border-l-4 border-cyber-cyan hover:shadow-glow"
              >
                <h3 className="heading-sm mb-3"><span className="text-cyber-cyan">Proven</span> Methodologies</h3>
                <p className="text-text-secondary">
                  Leverage industry best practices and established frameworks including ITIL, Agile, 
                  and enterprise architecture methodologies to ensure consistent, quality delivery.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="card-dark p-8 rounded-xl border-l-4 border-cyber-cyan hover:shadow-glow"
              >
                <h3 className="heading-sm mb-3"><span className="text-cyber-cyan">Knowledge</span> Transfer</h3>
                <p className="text-text-secondary">
                  Build internal capabilities and empower your team. Our engagements include training, 
                  documentation, and mentoring to ensure long-term success and sustainability.
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
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-blue/20 rounded-full blur-3xl"
        />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="heading-lg mb-6">
              Transform Your IT <span className="text-gradient">Organization</span>
            </h2>
            <p className="text-xl mb-8 text-text-secondary">
              Schedule a consultation to discuss your IT challenges and discover how we can help you achieve your business goals
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
