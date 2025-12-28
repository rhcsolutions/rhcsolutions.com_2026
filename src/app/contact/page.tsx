'use client';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import InteractiveWorldMap from '@/components/InteractiveWorldMap';
import { FaPhone, FaEnvelope, FaTelegram, FaWhatsapp, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

const BOOKING_URL = "https://outlook.office.com/bookwithme/user/3b3090bb02994e5085e163adf76b191b@rhcsolutions.com/meetingtype/pJ4cLjK2VUKjf_7-AdLjwg2?anonymous&ep=mlink";

export default function ContactPage() {
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
            <h1 className="heading-xl mb-6"><span className="text-gradient">Contact</span> Us</h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Let's discuss how we can help transform your IT infrastructure
            </p>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-md text-gradient mb-8">Get in Touch</h2>

              <div className="space-y-6 mb-12">
                <motion.div
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-dark-lighter transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyber-blue to-cyber-cyan rounded-lg flex items-center justify-center text-white text-xl shadow-glow-cyber-blue">
                    <FaPhone />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">Phone</h3>
                    <a href="tel:+19176282365" className="text-text-secondary hover:text-cyber-cyan transition-colors">
                      +1 (917) 628-2365
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-dark-lighter transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyber-cyan to-cyber-green rounded-lg flex items-center justify-center text-white text-xl shadow-glow-cyber-cyan">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">Email</h3>
                    <a href="mailto:info@rhcsolutions.com" className="text-text-secondary hover:text-cyber-cyan transition-colors">
                      info@rhcsolutions.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-dark-lighter transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center text-white text-xl shadow-glow-cyber-blue">
                    <FaTelegram />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">Telegram</h3>
                    <a href="https://t.me/19176282365" className="text-text-secondary hover:text-cyber-cyan transition-colors">
                      Available for instant messaging
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-dark-lighter transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyber-green to-cyber-cyan rounded-lg flex items-center justify-center text-white text-xl shadow-glow-cyber-green">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">WhatsApp</h3>
                    <a href="https://wa.me/19176282365" className="text-text-secondary hover:text-cyber-cyan transition-colors">
                      Connect via WhatsApp
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Social Media */}
              <div className="mb-12">
                <h3 className="font-semibold text-text-primary mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-cyber-blue to-cyber-cyan hover:shadow-glow-cyber-blue rounded-lg flex items-center justify-center text-white text-xl transition-all duration-300"
                    aria-label="LinkedIn"
                    whileHover={{ y: -3, scale: 1.05 }}
                  >
                    <FaLinkedin />
                  </motion.a>
                  <motion.a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-cyber-blue to-cyber-purple hover:shadow-glow-cyber-blue rounded-lg flex items-center justify-center text-white text-xl transition-all duration-300"
                    aria-label="Facebook"
                    whileHover={{ y: -3, scale: 1.05 }}
                  >
                    <FaFacebook />
                  </motion.a>
                  <motion.a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-cyber-purple to-cyber-blue hover:shadow-glow-cyber-purple rounded-lg flex items-center justify-center text-white text-xl transition-all duration-300"
                    aria-label="Instagram"
                    whileHover={{ y: -3, scale: 1.05 }}
                  >
                    <FaInstagram />
                  </motion.a>
                </div>
              </div>

              {/* Book a Meeting */}
              <motion.div
                className="card-cyber p-8 border-l-4 border-cyber-cyan"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="heading-sm text-gradient mb-4">Schedule a Meeting</h3>
                <p className="text-text-secondary mb-6">
                  Prefer to book directly? Use our online calendar to schedule a consultation
                  at a time that works for you.
                </p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta inline-block"
                >
                  Book a Meeting
                </a>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="heading-md text-gradient mb-8">Send Us a Message</h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Presence Section with Interactive Map */}
      <section className="section-padding bg-dark-lighter">
        <div className="container-custom">
          <motion.div
            className="max-w-6xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-lg text-gradient mb-8">Our Global Presence</h2>
            <p className="text-xl text-text-secondary mb-12">
              Serving clients worldwide with expertise and dedication
            </p>
          </motion.div>

          <InteractiveWorldMap />
        </div>
      </section>
    </>
  );
}
