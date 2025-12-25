'use client';
import { motion } from 'framer-motion';
import { FaDice, FaGlobe, FaPlane } from 'react-icons/fa';

const caseStudies = [
  {
    icon: FaDice,
    industry: 'Gambling & Betting SaaS',
    title: 'Multi-Platform Gaming Infrastructure',
    challenge: 'A leading gambling and betting SaaS provider needed a scalable, highly available infrastructure to support millions of concurrent users across multiple gaming platforms while maintaining regulatory compliance.',
    solution: 'RHC Solutions designed and implemented a multi-cloud architecture leveraging AWS and Azure, with auto-scaling capabilities, real-time data processing pipelines, and comprehensive monitoring. We ensured compliance with gaming regulations across multiple jurisdictions.',
    outcomes: [
      '99.99% uptime achieved across all platforms',
      'Scalability to handle 5M+ concurrent users',
      'Real-time data processing with sub-second latency',
      'Full regulatory compliance (Gaming Authority standards)',
      '40% reduction in infrastructure costs through optimization',
    ],
    expertise: [
      'Cloud architecture (AWS, Azure)',
      'Real-time data processing',
      'High-availability systems',
      'Regulatory compliance (Gaming)',
      'Performance optimization',
      'Auto-scaling infrastructure',
    ],
  },
  {
    icon: FaGlobe,
    industry: 'Global Trading & Telecommunications',
    title: 'Mission-Critical Trading Platform',
    challenge: 'A global trading and telecommunications company required a mission-critical infrastructure with sub-millisecond latency for high-frequency trading operations, operating 24/7 across multiple continents.',
    solution: 'We architected a low-latency trading infrastructure with global network optimization, redundant connectivity, and disaster recovery capabilities. The solution included real-time monitoring, automated failover, and comprehensive security controls.',
    outcomes: [
      'Sub-millisecond trading latency achieved',
      '99.99% uptime over 3+ years',
      'Global network optimization across 15+ locations',
      'Zero data loss during failover events',
      'Complete audit trail for regulatory compliance',
    ],
    expertise: [
      'Low-latency systems',
      'Global network architecture',
      'High-frequency trading infrastructure',
      'Disaster recovery',
      'Security & compliance',
      '24/7 operations support',
    ],
  },
  {
    icon: FaPlane,
    industry: 'Aerospace',
    title: 'Secure Aviation Systems Integration',
    challenge: 'An aerospace organization needed to modernize legacy systems while maintaining strict security and compliance requirements, ensuring seamless integration with both legacy and modern platforms.',
    solution: 'RHC Solutions delivered a phased modernization approach, integrating cloud-based services with existing on-premise systems. We implemented comprehensive security controls, ensured compliance with aerospace regulations, and provided training for internal teams.',
    outcomes: [
      'Successful legacy system modernization',
      'Zero security incidents during migration',
      'Full compliance with aerospace regulations',
      'Improved system reliability and performance',
      'Enhanced disaster recovery capabilities',
    ],
    expertise: [
      'Legacy system modernization',
      'Hybrid cloud integration',
      'Security & compliance (Aerospace)',
      'Mission-critical reliability',
      'Risk management',
      'Change management and training',
    ],
  },
];

export default function ClientsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-cyber text-white py-32 pt-40 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 w-96 h-96 bg-cyber-blue rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
        </div>
        
        <motion.div 
          className="container-custom relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">Our Clients & <span className="text-gradient">Case Studies</span></h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Real-world success stories from organizations that trust RHC Solutions
            </p>
          </div>
        </motion.div>
      </section>

      {/* Case Studies */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="space-y-20">
            {caseStudies.map((study, index) => {
              const Icon = study.icon;
              const isEven = index % 2 === 0;
              const gradientColors = [
                { from: 'cyber-blue', to: 'cyber-cyan' },
                { from: 'cyber-cyan', to: 'cyber-green' },
                { from: 'cyber-purple', to: 'cyber-blue' }
              ];
              const gradient = gradientColors[index % gradientColors.length];

              return (
                <motion.div 
                  key={study.title} 
                  className="max-w-6xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Header */}
                  <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-start mb-8`}>
                    <div className={`w-full lg:w-1/3 ${isEven ? '' : 'lg:text-right'}`}>
                      <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-${gradient.from} to-${gradient.to} rounded-2xl text-white text-4xl mb-6 shadow-glow-${gradient.from}`}>
                        <Icon />
                      </div>
                      <div className={`inline-block border-2 border-${gradient.from} text-${gradient.from} text-sm font-semibold px-4 py-2 rounded-full mb-4`}>
                        {study.industry}
                      </div>
                      <h2 className="heading-md text-gradient mb-4">{study.title}</h2>
                    </div>

                    <motion.div 
                      className="w-full lg:w-2/3"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`card-cyber p-8 border-l-4 border-${gradient.from}`}>
                        <h3 className="text-xl font-semibold text-text-primary mb-3">Challenge</h3>
                        <p className="text-text-secondary mb-6">{study.challenge}</p>

                        <h3 className="text-xl font-semibold text-text-primary mb-3">Solution</h3>
                        <p className="text-text-secondary">{study.solution}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Outcomes & Expertise */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div 
                      className="card-dark rounded-xl p-8 border-t-4 border-cyber-green hover:shadow-glow-cyber-green transition-all duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <h3 className="text-xl font-semibold text-gradient mb-6">Key Outcomes</h3>
                      <ul className="space-y-3">
                        {study.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start space-x-3">
                            <svg className="w-6 h-6 text-cyber-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-text-secondary">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div 
                      className="card-dark rounded-xl p-8 border-t-4 border-cyber-blue hover:shadow-glow-cyber-blue transition-all duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <h3 className="text-xl font-semibold text-gradient mb-6">Expertise Applied</h3>
                      <div className="flex flex-wrap gap-2">
                        {study.expertise.map((exp) => (
                          <span
                            key={exp}
                            className="inline-block border border-cyber-blue text-cyber-blue px-4 py-2 rounded-full text-sm font-medium hover:bg-cyber-blue/10 transition-colors duration-300"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {index < caseStudies.length - 1 && (
                    <div className="mt-12 border-b border-dark-lighter"></div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-cyber text-white relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-96 h-96 bg-cyber-cyan rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-cyber-green rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <motion.div 
          className="container-custom relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Ready to Write Your <span className="text-gradient">Success Story</span>?</h2>
            <p className="text-xl mb-8 text-text-secondary">
              Let's discuss how RHC Solutions can help your organization achieve its IT objectives
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
              <a
                href="/contact"
                className="btn-secondary"
              >
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
