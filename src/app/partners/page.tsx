'use client';
import { usePageContent } from '@/lib/cms/usePageContent';
import DynamicPageRenderer from '@/components/cms/DynamicPageRenderer';
import { motion } from 'framer-motion';
import { FaAws, FaMicrosoft, FaGoogle } from 'react-icons/fa';

export default function PartnersPage() {
  const { page } = usePageContent('/partners');

  if (page && page.blocks && page.blocks.length > 0) {
    return <DynamicPageRenderer blocks={page.blocks} />;
  }

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
            <h1 className="heading-xl mb-6">Our <span className="text-gradient">Partners</span></h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Strategic partnerships with industry-leading technology providers
            </p>
          </div>
        </motion.div>
      </section>

      {/* Partners Content */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xl text-text-secondary leading-relaxed">
                At <span className="text-text-primary font-semibold">RHC Solutions</span>, we believe in partnering with the best technology providers 
                to deliver exceptional value to our clients. Our strategic partnerships enable 
                us to leverage cutting-edge technologies and best practices across all our engagements.
              </p>
            </motion.div>

            {/* Cloud Partners */}
            <div className="mb-16">
              <motion.h2 
                className="heading-lg text-gradient mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Cloud Platform Partners
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div 
                  className="card-cyber p-8 text-center border-t-4 border-orange-500 hover:shadow-glow-orange-500 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 mx-auto shadow-lg">
                    <FaAws className="text-6xl text-white" />
                  </div>
                  <h3 className="heading-sm text-text-primary mb-4">Amazon Web Services</h3>
                  <p className="text-text-secondary">
                    Certified experts in AWS cloud services, delivering scalable, secure, 
                    and cost-effective cloud solutions.
                  </p>
                </motion.div>

                <motion.div 
                  className="card-cyber p-8 text-center border-t-4 border-cyber-blue hover:shadow-glow-cyber-blue transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyber-blue to-blue-600 rounded-2xl mb-6 mx-auto shadow-lg shadow-glow-cyber-blue">
                    <FaMicrosoft className="text-6xl text-white" />
                  </div>
                  <h3 className="heading-sm text-text-primary mb-4">Microsoft Azure</h3>
                  <p className="text-text-secondary">
                    Experienced Azure partners providing enterprise-grade cloud solutions 
                    and hybrid infrastructure.
                  </p>
                </motion.div>

                <motion.div 
                  className="card-cyber p-8 text-center border-t-4 border-red-500 hover:shadow-glow-red-500 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-6 mx-auto shadow-lg">
                    <FaGoogle className="text-6xl text-white" />
                  </div>
                  <h3 className="heading-sm text-text-primary mb-4">Google Cloud Platform</h3>
                  <p className="text-text-secondary">
                    GCP specialists leveraging Google's innovative cloud technologies 
                    for modern applications.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Security & Compliance Partners */}
            <motion.div 
              className="card-dark rounded-xl p-8 md:p-12 mb-16 border-l-4 border-cyber-cyan"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <h2 className="heading-md text-gradient mb-6 text-center">Security & Compliance Partners</h2>
              <p className="text-text-secondary text-center max-w-3xl mx-auto">
                We partner with leading security vendors to provide comprehensive cyber security 
                solutions, ensuring your organization is protected against evolving threats while 
                maintaining compliance with industry regulations.
              </p>
            </motion.div>

            {/* Technology Partners */}
            <motion.div 
              className="card-cyber p-8 md:p-12 border-l-4 border-cyber-purple"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <h2 className="heading-md text-gradient mb-6 text-center">Technology & Infrastructure Partners</h2>
              <p className="text-text-secondary text-center max-w-3xl mx-auto mb-8">
                Our partnerships extend across infrastructure providers, DevOps platforms, 
                monitoring solutions, and enterprise software vendors. These relationships 
                enable us to design and implement comprehensive solutions tailored to your 
                specific requirements.
              </p>
              
              <div className="text-center">
                <p className="text-sm text-text-secondary italic">
                  For specific partnership inquiries, please contact us directly.
                </p>
              </div>
            </motion.div>
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
            <h2 className="heading-lg mb-6">Let's Build Something <span className="text-gradient">Great Together</span></h2>
            <p className="text-xl mb-8 text-text-secondary">
              Leverage our partnerships and expertise to transform your IT infrastructure
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
