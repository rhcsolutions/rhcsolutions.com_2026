'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaUsers, FaRocket, FaMapMarkerAlt, FaClock, FaBriefcase, FaArrowRight, FaSpinner, FaUpload } from 'react-icons/fa';

// Job type definition
interface Job {
  id: number | string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  visible: boolean;
}

export default function CareersPage() {
  const [jobOpenings, setJobOpenings] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/cms/jobs');
        if (res.ok) {
          const data = await res.json();
          setJobOpenings(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const [selectedJob, setSelectedJob] = useState<number | string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '+',
    linkedin: 'https://www.linkedin.com/in/',
    coverLetter: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleApply = (jobId: number | string) => {
    setSelectedJob(jobId);
    setShowApplicationForm(true);
    setSubmitMessage('');
    setResumeFile(null);
    // Scroll to form
    setTimeout(() => {
      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitMessage('✗ Please enter a valid email address.');
      return;
    }

    // Validate international phone format
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    const cleanPhone = formData.phone.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      setSubmitMessage('✗ Phone must be in international format: +[country code][number] (e.g., +1234567890)');
      return;
    }

    // Validate LinkedIn URL
    if (!formData.linkedin.includes('linkedin.com/in/') || formData.linkedin === 'https://www.linkedin.com/in/') {
      setSubmitMessage('✗ Please enter your complete LinkedIn profile URL.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const jobTitle = jobOpenings.find(j => j.id === selectedJob)?.title || 'Unknown Position';
      // Normalize inputs
      const sanitizedPhone = cleanPhone;
      const normalizedLinkedIn = formData.linkedin.trim();

      // Build FormData for multipart upload
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', sanitizedPhone);
      formDataToSend.append('linkedin', normalizedLinkedIn);
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('jobTitle', jobTitle);
      if (resumeFile) {
        formDataToSend.append('resume', resumeFile);
      }

      const response = await fetch('/api/apply', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('✓ Application submitted successfully! We will review your application and get back to you soon.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '+',
          linkedin: 'https://www.linkedin.com/in/',
          coverLetter: ''
        });
        setResumeFile(null);
        setTimeout(() => {
          setShowApplicationForm(false);
          setSelectedJob(null);
          setSubmitMessage('');
        }, 3000);
      } else {
        setSubmitMessage(`✗ ${data.error || 'Error submitting application. Please try again.'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitMessage('✗ Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const visibleJobs = jobOpenings.filter(job => job.visible);
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
            <h1 className="heading-xl mb-6">Join <span className="text-gradient">Our Team</span></h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Build your career with passionate IT experts dedicated to innovation
            </p>
          </div>
        </motion.div>
      </section>

      {/* Why Join Us */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto mb-16">
            <motion.h2
              className="heading-lg text-gradient mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Why Join RHC Solutions?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div
                className="text-center card-dark p-6 rounded-xl border-t-4 border-cyber-blue hover:shadow-glow-cyber-blue transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyber-blue to-cyber-cyan rounded-full text-white text-3xl mb-6 shadow-glow-cyber-blue">
                  <FaLightbulb />
                </div>
                <h3 className="heading-sm text-text-primary mb-4">Innovation</h3>
                <p className="text-text-secondary">
                  Work with cutting-edge technologies and solve complex challenges for
                  leading organizations across multiple industries.
                </p>
              </motion.div>

              <motion.div
                className="text-center card-dark p-6 rounded-xl border-t-4 border-cyber-cyan hover:shadow-glow-cyber-cyan transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyber-cyan to-cyber-green rounded-full text-white text-3xl mb-6 shadow-glow-cyber-cyan">
                  <FaUsers />
                </div>
                <h3 className="heading-sm text-text-primary mb-4">Collaborative Culture</h3>
                <p className="text-text-secondary">
                  Join a team of experts who value collaboration, knowledge sharing,
                  and continuous learning.
                </p>
              </motion.div>

              <motion.div
                className="text-center card-dark p-6 rounded-xl border-t-4 border-cyber-purple hover:shadow-glow-cyber-purple transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyber-purple to-cyber-blue rounded-full text-white text-3xl mb-6 shadow-glow-cyber-purple">
                  <FaRocket />
                </div>
                <h3 className="heading-sm text-text-primary mb-4">Career Growth</h3>
                <p className="text-text-secondary">
                  Develop your skills with diverse projects, professional development
                  opportunities, and mentorship.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="card-cyber p-8 md:p-12 border-l-4 border-cyber-green"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="heading-md text-gradient mb-6 text-center">What We Offer</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-text-secondary">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-cyber-green flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Competitive salary and benefits</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-cyber-green flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Flexible work arrangements</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-cyber-green flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Professional development budget</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-cyber-green flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Work-life balance</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-cyber-green flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Challenging projects</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-cyber-green flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Supportive team environment</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="section-padding bg-dark-lighter">
        <div className="container-custom">
          <motion.h2
            className="heading-lg text-gradient mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Current Openings
          </motion.h2>

          {visibleJobs.length === 0 ? (
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                className="card-cyber p-12 border-l-4 border-cyber-cyan"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xl text-text-secondary mb-6">
                  While we don't have any open positions at the moment, we're always interested
                  in connecting with talented IT professionals.
                </p>
                <p className="text-text-secondary mb-8">
                  We encourage you to reach out if you're passionate about technology.
                </p>
                <a href="mailto:info@rhcsolutions.com?subject=Career Inquiry" className="btn-cta inline-block">
                  Send Your Resume
                </a>
              </motion.div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                {visibleJobs.map((job, idx) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="card-cyber p-6 hover:border-cyber-green transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-cyber-green transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-cyber-cyan font-semibold text-sm">{job.department}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyber-green/20 text-cyber-green">
                        {job.type}
                      </span>
                    </div>

                    <p className="text-text-secondary mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-text-muted">
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-cyber-cyan" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaBriefcase className="text-cyber-green" />
                        <span>{job.department}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-text-primary mb-2">Key Requirements:</p>
                      <ul className="space-y-1">
                        {job.requirements.slice(0, 3).map((req, i) => (
                          <li key={i} className="text-sm text-text-secondary flex items-start space-x-2">
                            <span className="text-cyber-green mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleApply(job.id)}
                      className="w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      <span>Apply Now</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Application Form */}
      {showApplicationForm && selectedJob && (
        <section id="application-form" className="section-padding bg-dark">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <div className="card-cyber p-8">
                <h2 className="heading-lg text-gradient mb-6 text-center">Apply for Position</h2>
                <div className="bg-dark-lighter p-4 rounded-lg mb-8 border-l-4 border-cyber-green">
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {jobOpenings.find(j => j.id === selectedJob)?.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {jobOpenings.find(j => j.id === selectedJob)?.department} • {jobOpenings.find(j => j.id === selectedJob)?.location}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitMessage && (
                    <div className={`p-4 rounded-lg ${submitMessage.includes('✓') ? 'bg-cyber-green/20 text-cyber-green' : 'bg-cyber-red/20 text-cyber-red'}`}>
                      {submitMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-text-primary font-semibold mb-2">
                        First Name <span className="text-cyber-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        disabled={isSubmitting}
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg py-3 px-4 text-white 
                                 focus:border-cyber-green focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-600"
                        placeholder="John"
                        autoComplete="given-name"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-text-primary font-semibold mb-2">
                        Last Name <span className="text-cyber-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        disabled={isSubmitting}
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg py-3 px-4 text-white 
                                 focus:border-cyber-green focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-600"
                        placeholder="Doe"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-text-primary font-semibold mb-2">
                      Email Address <span className="text-cyber-red">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                      title="Please enter a valid email address" className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg py-3 px-4 text-white 
                               focus:border-cyber-cyan focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-600"
                      placeholder="john.doe@example.com"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-text-primary font-semibold mb-2">
                      Phone Number (International Format) <span className="text-cyber-red">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      disabled={isSubmitting}
                      value={formData.phone}
                      onChange={(e) => {
                        let value = e.target.value;
                        // Ensure it starts with +
                        if (!value.startsWith('+')) {
                          value = '+' + value.replace(/^\+*/, '');
                        }
                        setFormData({ ...formData, phone: value });
                      }}
                      pattern="\+[1-9]\d{1,14}"
                      title="International format required: +[country code][number] (e.g., +1234567890)"
                      className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg py-3 px-4 text-white font-mono
                               focus:border-cyber-cyan focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-600"
                      placeholder="+1234567890"
                      autoComplete="tel"
                    />
                    <p className="text-gray-500 text-sm mt-1">International format required: +[country code][number]</p>
                  </div>

                  <div>
                    <label htmlFor="linkedin" className="block text-text-primary font-semibold mb-2">
                      LinkedIn Profile URL <span className="text-cyber-red">*</span>
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      required
                      disabled={isSubmitting}
                      value={formData.linkedin}
                      onChange={(e) => {
                        let value = e.target.value;
                        // Maintain the base URL if user tries to delete it
                        if (!value.startsWith('https://www.linkedin.com/in/')) {
                          if (value.length < 'https://www.linkedin.com/in/'.length) {
                            value = 'https://www.linkedin.com/in/';
                          }
                        }
                        setFormData({ ...formData, linkedin: value });
                      }}
                      onFocus={(e) => {
                        // Move cursor to end
                        const len = e.target.value.length;
                        e.target.setSelectionRange(len, len);
                      }}
                      pattern="https://www\.linkedin\.com/in/.+"
                      title="Please enter your complete LinkedIn profile URL"
                      className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg py-3 px-4 text-white 
                               focus:border-cyber-blue focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-600"
                      placeholder="https://www.linkedin.com/in/yourprofile"
                      autoComplete="url"
                    />
                  </div>

                  <div>
                    <label htmlFor="coverLetter" className="block text-text-primary font-semibold mb-2">
                      Cover Letter / Why are you interested?
                    </label>
                    <textarea
                      id="coverLetter"
                      rows={6}
                      disabled={isSubmitting}
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg py-3 px-4 text-white 
                               focus:border-cyber-purple focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-600"
                      placeholder="Tell us about yourself and why you're interested in this position..."
                    />
                  </div>

                  {/* Resume/CV Upload */}
                  <div>
                    <label htmlFor="resume" className="block text-text-primary font-semibold mb-2">
                      Resume / CV
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="resume"
                        disabled={isSubmitting}
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label
                        htmlFor="resume"
                        className={`flex items-center justify-center gap-3 w-full bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg py-4 px-4 text-white 
                                   hover:border-cyber-cyan hover:bg-gray-800 cursor-pointer transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <FaUpload className="text-cyber-cyan text-xl" />
                        <span className="text-text-secondary">
                          {resumeFile ? resumeFile.name : 'Click to upload resume (PDF, DOC, DOCX)'}
                        </span>
                      </label>
                    </div>
                    {resumeFile && (
                      <div className="mt-2 flex items-center justify-between bg-dark-lighter p-3 rounded-lg border border-cyber-green/30">
                        <span className="text-cyber-green text-sm">✓ {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)</span>
                        <button
                          type="button"
                          onClick={() => setResumeFile(null)}
                          disabled={isSubmitting}
                          className="text-cyber-red hover:text-red-400 transition-colors text-sm disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    <p className="text-gray-500 text-sm mt-2">Accepted formats: PDF, DOC, DOCX (Max 10MB)</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowApplicationForm(false);
                        setSelectedJob(null);
                        setSubmitMessage('');
                        setResumeFile(null);
                      }}
                      disabled={isSubmitting}
                      className="flex-1 btn-secondary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 btn-primary py-3 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Submit Application</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
            <h2 className="heading-lg mb-6">Ready to Make an <span className="text-gradient">Impact</span>?</h2>
            <p className="text-xl mb-8 text-text-secondary">
              Join our team of passionate IT professionals and help shape the future of technology
            </p>
            <a
              href="mailto:info@rhcsolutions.com?subject=Career Inquiry"
              className="btn-cta"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
