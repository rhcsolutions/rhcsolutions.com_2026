'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaPaperPlane } from 'react-icons/fa';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const msg = (data && data.error) || `Request failed: ${res.status}`;
        setErrorMessage(msg);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Contact form submit failed', error);
      setErrorMessage('Unable to send message. Please try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label htmlFor="name" className="block text-sm font-bold text-text-primary mb-2 text-mono">
          NAME *
        </label>
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 bg-dark-lighter border ${
              focusedField === 'name' ? 'border-cyber-blue shadow-glow' : 'border-dark-card/50'
            } rounded-lg text-text-primary placeholder-text-muted transition-all duration-300
            focus:outline-none focus:border-cyber-blue focus:shadow-glow`}
            placeholder="John Doe"
          />
          {focusedField === 'name' && (
            <motion.div
              layoutId="focusIndicator"
              className="absolute inset-0 rounded-lg border-2 border-cyber-blue pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label htmlFor="email" className="block text-sm font-bold text-text-primary mb-2 text-mono">
          EMAIL *
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 bg-dark-lighter border ${
              focusedField === 'email' ? 'border-cyber-cyan shadow-glow' : 'border-dark-card/50'
            } rounded-lg text-text-primary placeholder-text-muted transition-all duration-300
            focus:outline-none focus:border-cyber-cyan focus:shadow-glow`}
            placeholder="john@company.com"
          />
          {focusedField === 'email' && (
            <motion.div
              layoutId="focusIndicator"
              className="absolute inset-0 rounded-lg border-2 border-cyber-cyan pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label htmlFor="company" className="block text-sm font-bold text-text-primary mb-2 text-mono">
          COMPANY
        </label>
        <div className="relative">
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            onFocus={() => setFocusedField('company')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 bg-dark-lighter border ${
              focusedField === 'company' ? 'border-cyber-purple shadow-glow' : 'border-dark-card/50'
            } rounded-lg text-text-primary placeholder-text-muted transition-all duration-300
            focus:outline-none focus:border-cyber-purple focus:shadow-glow`}
            placeholder="Your Company Inc. (optional)"
          />
          {focusedField === 'company' && (
            <motion.div
              layoutId="focusIndicator"
              className="absolute inset-0 rounded-lg border-2 border-cyber-purple pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <label htmlFor="message" className="block text-sm font-bold text-text-primary mb-2 text-mono">
          MESSAGE *
        </label>
        <div className="relative">
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 bg-dark-lighter border ${
              focusedField === 'message' ? 'border-cyber-green shadow-glow' : 'border-dark-card/50'
            } rounded-lg text-text-primary placeholder-text-muted transition-all duration-300 resize-none
            focus:outline-none focus:border-cyber-green focus:shadow-glow`}
            placeholder="Tell us about your project or inquiry..."
          />
          {focusedField === 'message' && (
            <motion.div
              layoutId="focusIndicator"
              className="absolute inset-0 rounded-lg border-2 border-cyber-green pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="bg-cyber-green/10 border border-cyber-green/50 text-cyber-green px-4 py-3 rounded-lg 
                     flex items-center space-x-3 overflow-hidden"
          >
            <FaCheckCircle className="text-2xl flex-shrink-0" />
            <div>
              <p className="font-bold">Success!</p>
              <p className="text-sm">Your message has been sent. We'll get back to you soon.</p>
            </div>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="bg-cyber-red/10 border border-cyber-red/50 text-cyber-red px-4 py-3 rounded-lg 
                     flex items-center space-x-3 overflow-hidden"
          >
            <FaExclamationTriangle className="text-2xl flex-shrink-0" />
            <div>
              <p className="font-bold">Error</p>
              <p className="text-sm">{errorMessage || 'Something went wrong. Please try again or contact us directly.'}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={status === 'submitting'}
        whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
        whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
        className="w-full btn-cta text-center disabled:opacity-50 disabled:cursor-not-allowed 
                 flex items-center justify-center space-x-2 relative overflow-hidden group"
      >
        {status === 'submitting' ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
            <span>Send Message</span>
          </>
        )}
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-text-muted text-center"
      >
        By submitting this form, you agree to our{' '}
        <a href="/privacy" className="text-cyber-blue hover:text-cyber-cyan transition-colors">
          privacy policy
        </a>
        .
      </motion.p>
    </form>
  );
}
