'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCheckCircle, FaAward, FaUsers, FaLightbulb, FaHandshake } from 'react-icons/fa';
import { AnimatedStatsGrid } from '@/components/AnimatedStats';

const values = [
  {
    icon: FaAward,
    title: 'Professionalism',
    description: 'We maintain the highest standards of professional conduct in every engagement.',
  },
  {
    icon: FaHandshake,
    title: 'Reliability',
    description: 'Our clients trust us to deliver on our commitments, every time.',
  },
  {
    icon: FaCheckCircle,
    title: 'Accountability',
    description: 'We take ownership of outcomes and stand behind our work.',
  },
  {
    icon: FaLightbulb,
    title: 'Innovation',
    description: 'We continuously explore new technologies and approaches to solve complex challenges.',
  },
];

const timeline = [
  { year: '1994', event: 'RHC Solutions founded with a vision to transform business IT' },
  { year: '2000', event: 'Expanded services to include enterprise infrastructure solutions' },
  { year: '2008', event: 'Pioneered cloud migration services for financial institutions' },
  { year: '2015', event: 'Launched comprehensive cyber security and compliance practice' },
  { year: '2020', event: 'Delivered critical remote work solutions during global transition' },
  { year: '2024', event: 'Celebrating 30 years of excellence and innovation' },
];

export default function AboutPage() {
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
            <h1 className="heading-xl mb-6">About <span className="text-gradient">RHC Solutions</span></h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Three decades of IT excellence, innovation, and unwavering commitment to client success
            </p>
          </div>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="heading-lg text-gradient mb-6">Our Story</h2>
            </div>

            <div className="prose prose-lg max-w-none text-text-secondary space-y-6">
              <p className="text-xl">
                Searching for a trusted IT partner to meet your company's needs? Look no further. 
                Since 1994, <span className="text-text-primary font-semibold">RHC Solutions</span> has been at the forefront of business technology transformation, 
                helping organizations of all sizes achieve their goals through innovative IT solutions.
              </p>

              <p>
                Founded with a vision to bridge the gap between business objectives and technology 
                capabilities, RHC Solutions specializes in the implementation, integration, and 
                maintenance of business information systems. Over the past 30 years, we've grown 
                from a small consulting firm to a trusted partner for enterprises across multiple 
                industries worldwide.
              </p>

              <p>
                Our journey has been defined by our commitment to excellence and our passion for 
                solving complex technical challenges. We've witnessed the evolution of technology—from 
                on-premise datacenters to cloud computing, from basic network security to comprehensive 
                cyber security frameworks—and we've been privileged to guide our clients through 
                each transformation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-dark-lighter">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              className="card-cyber p-8 md:p-10 border-l-4 border-cyber-cyan"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyber-cyan to-cyber-blue rounded-xl text-white text-5xl mb-6">
                <FaLightbulb />
              </div>
              <h3 className="heading-md text-gradient mb-4">Our Mission</h3>
              <p className="text-text-secondary text-lg">
                To enhance your organization's performance by delivering robust, scalable, and 
                innovative IT infrastructure solutions. We're dedicated to understanding your unique 
                challenges and providing tailored solutions that drive efficiency, security, and growth.
              </p>
            </motion.div>

            <motion.div 
              className="card-cyber p-8 md:p-10 border-l-4 border-cyber-blue"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-xl text-white text-5xl mb-6">
                <FaUsers />
              </div>
              <h3 className="heading-md text-gradient mb-4">Our Team</h3>
              <p className="text-text-secondary text-lg">
                Our success is built on the expertise and passion of our team. We bring together 
                seasoned professionals with deep technical knowledge and real-world experience across 
                multiple domains—cloud infrastructure, cyber security, DevOps, compliance, and more. 
                Every team member is committed to your success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-lg text-gradient mb-6">Our Core Values</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              These principles guide every decision we make and every solution we deliver
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              const colors = ['cyber-blue', 'cyber-cyan', 'cyber-green', 'cyber-purple'];
              const borderColor = colors[index % colors.length];
              
              return (
                <motion.div
                  key={value.title}
                  className={`text-center p-6 card-dark rounded-xl border-t-4 border-${borderColor} hover:shadow-glow-${borderColor} transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${borderColor} to-${borderColor}/50 rounded-full text-white text-3xl mb-4`}>
                    <Icon />
                  </div>
                  <h3 className="heading-sm text-text-primary mb-3">{value.title}</h3>
                  <p className="text-text-secondary">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-dark-lighter">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-lg text-gradient mb-6">Our Journey</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Three decades of innovation, growth, and excellence
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-blue via-cyber-cyan to-cyber-green"></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Year Badge */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-cyber-blue to-cyber-cyan text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10 shadow-glow-cyber-blue">
                      '{item.year.slice(2)}
                    </div>

                    {/* Content */}
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'} pl-24 md:pl-0`}>
                      <div className="card-cyber p-6 rounded-lg hover:shadow-glow-cyber-blue transition-all duration-300">
                        <div className="font-bold text-gradient text-xl mb-2">{item.year}</div>
                        <p className="text-text-secondary">{item.event}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Animated Stats */}
            <div className="mt-16">
              <AnimatedStatsGrid stats={[
                {label: 'Founded', value: 1994, suffix: ''},
                {label: 'Projects Delivered', value: 500, suffix: '+'},
                {label: 'Industries Served', value: 15, suffix: '+'},
                {label: 'Client Satisfaction', value: 98, suffix: '%'}
              ]} />
            </div>
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
            <h2 className="heading-lg mb-6">Experience the <span className="text-gradient">RHC Solutions</span> Difference</h2>
            <p className="text-xl mb-8 text-text-secondary">
              Partner with a team that combines 30+ years of expertise with a passion for innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://outlook.office.com/bookwithme/user/3b3090bb02994e5085e163adf76b191b@rhcsolutions.com/meetingtype/pJ4cLjK2VUKjf_7-AdLjwg2?anonymous&ep=mlink"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta"
              >
                Schedule a Meeting
              </a>
              <Link href="/contact">
                <button className="btn-secondary">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
