'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const BOOKING_URL = "https://outlook.office.com/bookwithme/user/3b3090bb02994e5085e163adf76b191b@rhcsolutions.com/meetingtype/pJ4cLjK2VUKjf_7-AdLjwg2?anonymous&ep=mlink";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-cyber overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10" />
      <div className="absolute inset-0 bg-noise opacity-20" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/20 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Glitch Effect Title */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="heading-xl mb-4 relative inline-block">
                <span className="relative z-10">
                  RHC <span className="text-gradient">Solutions</span>
                </span>
                {/* Glitch layers */}
                <span className="absolute top-0 left-0 text-cyber-blue opacity-70 animate-pulse" style={{ transform: 'translate(-2px, -2px)' }} aria-hidden="true">
                  RHC Solutions
                </span>
                <span className="absolute top-0 left-0 text-cyber-cyan opacity-70 animate-pulse" style={{ transform: 'translate(2px, 2px)' }} aria-hidden="true">
                  RHC Solutions
                </span>
              </h1>
            </motion.div>
            
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-6"
            >
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-mono mb-4">
                <span className="text-cyber-green">&gt;</span> We Just Do IT
              </p>
            </motion.div>

            {/* Subtitle with typing effect */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-text-secondary mb-8 font-light"
            >
              Implementation <span className="text-cyber-cyan">•</span> Integration <span className="text-cyber-cyan">•</span> Maintenance
            </motion.p>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg md:text-xl text-text-secondary mb-12 leading-relaxed max-w-4xl mx-auto"
            >
              <p>
                Searching for a <span className="text-cyber-blue font-semibold">trusted IT partner</span> to meet your company's needs? 
                With <span className="text-gradient font-semibold">30+ years of expertise</span>, we deliver innovative 
                solutions tailored to your unique challenges, ensuring seamless operations and 
                driving business growth.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta text-lg px-10 py-4"
              >
                Book a Meeting
              </a>
              <Link
                href="/services"
                className="btn-secondary text-lg px-10 py-4"
              >
                Explore Services
              </Link>
            </motion.div>

            {/* Since Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: 'spring' }}
              className="mt-16"
            >
              <div className="inline-block card-cyber">
                <p className="text-lg font-semibold">
                  <span className="text-mono text-cyber-cyan">since_1994</span>
                  <span className="text-text-muted mx-2">|</span>
                  <span className="text-gradient">30+ Years of Excellence</span>
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16"
          >
            {[
              { value: '500+', label: 'Projects Delivered' },
              { value: '15+', label: 'Industries' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                className="card-dark text-center group"
              >
                <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</p>
                <p className="text-text-muted text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-text-muted text-sm uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-cyber-blue/50 rounded-full flex justify-center group-hover:border-cyber-blue transition-colors">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-3 bg-cyber-blue rounded-full mt-2"
            />
          </div>
          <FaChevronDown className="text-cyber-blue/70 animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}
