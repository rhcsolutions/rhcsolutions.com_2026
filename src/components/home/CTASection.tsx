'use client';

import { motion } from 'framer-motion';
import { FaCheckCircle, FaRocket } from 'react-icons/fa';
import Link from 'next/link';

const BOOKING_URL = "https://outlook.office.com/bookwithme/user/3b3090bb02994e5085e163adf76b191b@rhcsolutions.com/meetingtype/pJ4cLjK2VUKjf_7-AdLjwg2?anonymous&ep=mlink";

const trustBadges = [
  { icon: FaCheckCircle, text: '30+ Years Experience' },
  { icon: FaCheckCircle, text: '500+ Projects Delivered' },
  { icon: FaCheckCircle, text: '98% Client Satisfaction' },
];

export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-cyber relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10" />
      <div className="absolute inset-0 bg-noise opacity-20" />
      
      {/* Animated Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-green/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="w-16 h-16 bg-cyber-blue/10 border-2 border-cyber-blue rounded-full 
                            flex items-center justify-center mx-auto animate-pulse-slow">
                <FaRocket className="text-3xl text-cyber-blue" />
              </div>
            </motion.div>

            <h2 className="heading-lg mb-6">
              Ready to Transform Your <span className="text-gradient">IT Infrastructure</span>?
            </h2>
            
            <p className="text-xl md:text-2xl mb-10 text-text-secondary max-w-3xl mx-auto">
              Let's discuss how RHC Solutions can help drive your business forward with 
              <span className="text-cyber-cyan font-semibold"> innovative IT solutions</span> tailored to your unique needs.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta text-lg px-10 py-4"
              >
                Schedule a Consultation
              </a>
              <Link
                href="/contact"
                className="btn-secondary text-lg px-10 py-4"
              >
                Contact Us
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-6 md:gap-8"
            >
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="flex items-center space-x-2 bg-dark-card border border-cyber-blue/30 
                           rounded-full px-6 py-3 hover:border-cyber-blue hover:shadow-[0_0_20px_rgba(0,217,255,0.3)] 
                           transition-all duration-300"
                >
                  <badge.icon className="text-cyber-green text-lg" />
                  <span className="text-text-primary font-medium">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
