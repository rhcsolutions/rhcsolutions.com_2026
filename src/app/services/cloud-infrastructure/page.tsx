'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaAws, FaMicrosoft, FaGoogle, FaCloud, FaServer, FaCode, FaCheckCircle } from 'react-icons/fa';

const platforms = [
  {
    icon: FaAws,
    name: 'Amazon Web Services',
    description: 'Comprehensive AWS expertise including EC2, S3, RDS, Lambda, and more.',
  },
  {
    icon: FaMicrosoft,
    name: 'Microsoft Azure',
    description: 'Full Azure stack proficiency including virtual machines, storage, and Azure AD.',
  },
  {
    icon: FaGoogle,
    name: 'Google Cloud Platform',
    description: 'GCP services including Compute Engine, Cloud Storage, and Kubernetes Engine.',
  },
];

const services = [
  {
    icon: FaCloud,
    title: 'Cloud Migration',
    description: 'Seamless migration of your applications and data to the cloud with minimal disruption to your business operations.',
    capabilities: [
      'Assessment and planning',
      'Application modernization',
      'Data migration strategies',
      'Hybrid cloud solutions',
      'Post-migration optimization',
    ],
  },
  {
    icon: FaServer,
    title: 'Infrastructure Design',
    description: 'Design scalable, resilient infrastructure architectures that support your business growth and ensure high availability.',
    capabilities: [
      'Architecture design and review',
      'Scalability planning',
      'High availability solutions',
      'Disaster recovery design',
      'Cost optimization',
    ],
  },
  {
    icon: FaCode,
    title: 'DevOps & CI/CD',
    description: 'Implement modern DevOps practices and CI/CD pipelines to accelerate deployment and improve software quality.',
    capabilities: [
      'Pipeline automation',
      'Infrastructure as Code',
      'Configuration management',
      'Container orchestration',
      'Monitoring and logging',
    ],
  },
];

export default function CloudInfrastructurePage() {
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
              Cloud & <span className="text-gradient">Infrastructure</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Full lifecycle management on AWS, Azure, and GCP
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
              RHC Solutions delivers comprehensive cloud and infrastructure services across all major 
              platforms. Whether you're migrating to the cloud, optimizing existing infrastructure, 
              or building from the ground up, our experts ensure your infrastructure is scalable, 
              secure, and cost-effective.
            </p>
          </motion.div>

          {/* Cloud Platforms */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg mb-12 text-center"
            >
              Cloud Platforms We <span className="text-gradient">Master</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {platforms.map((platform, index) => {
                const Icon = platform.icon;
                return (
                  <motion.div
                    key={platform.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)' }}
                    className="card-cyber rounded-xl p-8 text-center"
                  >
                    <div className="text-6xl text-cyber-cyan mb-6 flex justify-center">
                      <Icon />
                    </div>
                    <h3 className="heading-sm mb-4"><span className="text-gradient">{platform.name}</span></h3>
                    <p className="text-text-secondary">{platform.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                >
                  <div className={`w-full lg:w-5/12 ${isEven ? '' : 'lg:text-right'}`}>
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-cyber-blue/10 rounded-2xl text-cyber-blue text-4xl mb-6 border border-cyber-blue/20">
                      <Icon />
                    </div>
                    <h3 className="heading-md mb-4"><span className="text-gradient">{service.title}</span></h3>
                    <p className="text-lg text-text-secondary">{service.description}</p>
                  </div>

                  <div className="w-full lg:w-7/12">
                    <div className="card-dark rounded-xl p-8">
                      <h4 className="text-xl font-semibold text-cyber-cyan mb-6">Capabilities</h4>
                      <ul className="space-y-3">
                        {service.capabilities.map((capability) => (
                          <li key={capability} className="flex items-start space-x-3">
                            <FaCheckCircle className="w-6 h-6 text-cyber-green flex-shrink-0 mt-0.5" />
                            <span className="text-text-secondary">{capability}</span>
                          </li>
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

      {/* Datacenter Operations */}
      <section className="section-padding bg-dark-lighter">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-lg mb-12 text-center"
            >
              Datacenter <span className="text-gradient">Operations</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="card-dark p-8 rounded-xl hover:shadow-glow"
              >
                <h3 className="heading-sm mb-4"><span className="text-cyber-cyan">24/7</span> Monitoring</h3>
                <p className="text-text-secondary">
                  Continuous monitoring of your infrastructure to detect and resolve issues 
                  before they impact your business.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="card-dark p-8 rounded-xl hover:shadow-glow"
              >
                <h3 className="heading-sm mb-4"><span className="text-cyber-cyan">Performance</span> Optimization</h3>
                <p className="text-text-secondary">
                  Regular performance tuning and optimization to ensure your infrastructure 
                  operates at peak efficiency.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="card-dark p-8 rounded-xl hover:shadow-glow"
              >
                <h3 className="heading-sm mb-4"><span className="text-cyber-cyan">Capacity</span> Planning</h3>
                <p className="text-text-secondary">
                  Proactive capacity planning to ensure your infrastructure scales with 
                  your business needs.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="card-dark p-8 rounded-xl hover:shadow-glow"
              >
                <h3 className="heading-sm mb-4"><span className="text-cyber-cyan">Security</span> Management</h3>
                <p className="text-text-secondary">
                  Comprehensive security controls including patching, access management, 
                  and threat detection.
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
              Ready to Modernize Your <span className="text-gradient">Infrastructure</span>?
            </h2>
            <p className="text-xl mb-8 text-text-secondary">
              Let's discuss how we can help you leverage the cloud to drive business growth
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
