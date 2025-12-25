'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { AnimatedStatsGrid } from '@/components/AnimatedStats';

const values = [
  'Professionalism',
  'Reliability',
  'Accountability',
  'Innovation',
];

const stats = [
  { value: 1994, label: 'Founded', prefix: '' },
  { value: 500, label: 'Projects Delivered', suffix: '+' },
  { value: 15, label: 'Industries Served', suffix: '+' },
  { value: 98, label: 'Client Satisfaction', suffix: '%' },
];

export default function AboutPreview() {
  return (
    <section className="section-padding bg-dark-lighter relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-5" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyber-purple/10 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-cyber-green/10 text-cyber-green font-bold px-6 py-2 rounded-full mb-6 border border-cyber-green/30">
              <span className="text-mono">&gt; We Just Do IT</span>
            </div>
            
            <h2 className="heading-lg mb-6">
              Your Trusted IT Partner <span className="text-gradient">Since 1994</span>
            </h2>
            
            <div className="space-y-6 text-text-secondary text-lg">
              <p>
                For over <span className="text-cyber-cyan font-semibold">three decades</span>, RHC Solutions has been at the forefront of IT innovation, 
                helping businesses transform their operations through strategic technology implementation.
              </p>
              
              <p>
                Our mission is to enhance your organization's performance by delivering robust, 
                scalable IT infrastructure solutions that drive <span className="text-cyber-blue font-semibold">efficiency and growth</span>. We combine 
                deep technical expertise with a passion for solving complex business challenges.
              </p>

              <div className="mt-8">
                <h3 className="heading-sm mb-6">Our Core <span className="text-gradient">Values</span></h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {values.map((value, index) => (
                    <motion.div
                      key={value}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-3 bg-dark-card border border-dark-border rounded-lg p-3 
                               hover:border-cyber-blue transition-all duration-300 group"
                    >
                      <FaCheckCircle className="text-cyber-green text-xl flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="font-medium text-text-primary">{value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8"
            >
              <Link href="/about-us" className="btn-primary">
                <span>Learn More About Us</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="card-cyber p-8">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="text-7xl font-bold text-gradient mb-4"
                >
                  30+
                </motion.div>
                <div className="text-2xl font-semibold text-text-primary mb-2">Years of Excellence</div>
                <p className="text-text-muted text-sm">Leading the industry since 1994</p>
              </div>
              
              <div className="divider-glow" />
              
              <div className="mt-8">
                <AnimatedStatsGrid stats={stats} columns={2} />
              </div>
            </div>

            {/* Decorative Glow Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyber-blue/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-cyber-purple/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
