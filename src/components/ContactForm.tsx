'use client';

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaPaperPlane } from 'react-icons/fa';
import { SiteSettings } from '@/lib/cms/database';

interface ContactFormProps {
  config?: {
    id: string;
    name: string;
    placement?: {
      pageSlug: string;
      position: 'top' | 'bottom';
    };
    settings: {
      notificationEmail?: string;
      autoResponse?: string;
      enableWhatsApp?: boolean;
      enableTelegram?: boolean;
    };
    fields: Array<{
      id: string;
      label: string;
      type: string;
      required: boolean;
      placeholder?: string;
    }>;
  };
}

export default function ContactForm({ config }: ContactFormProps) {
  const [fields, setFields] = useState<any[]>(config?.fields || []);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'submitting' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formSettings, setFormSettings] = useState<any>(config?.settings || null);

  useEffect(() => {
    if (config) {
      setFields(config.fields);
      setFormSettings(config.settings);
      setStatus('idle');
      // Initialize form data
      const initialData: Record<string, string> = {};
      config.fields.forEach(f => initialData[f.id] = '');
      setFormData(initialData);
      return;
    }
    fetchSettings();
  }, [config]);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/cms/settings');
      if (res.ok) {
        const settings: any = await res.json();
        let targetForm = null;

        // Try to find default contact form in new forms array
        if (settings.forms && settings.forms.length > 0) {
          targetForm = settings.forms.find((f: any) => f.id === 'contact_form_default') || settings.forms[0];
        }
        // Fallback to legacy formBuilder
        else if (settings.formBuilder) {
          targetForm = { fields: settings.formBuilder.contactForm, settings: settings.formBuilder.settings };
        }

        if (targetForm) {
          setFields(targetForm.fields);
          setFormSettings(targetForm.settings);

          // Initialize form data
          const initialData: Record<string, string> = {};
          targetForm.fields.forEach((f: any) => initialData[f.id] = '');
          setFormData(initialData);
          setStatus('idle');
        } else {
          // Fallback hardcoded if absolutely nothing found
          const contactFields = [
            { id: 'name', label: 'NAME *', type: 'text', required: true, placeholder: 'John Doe' },
            { id: 'email', label: 'EMAIL *', type: 'email', required: true, placeholder: 'john@company.com' },
            { id: 'message', label: 'MESSAGE *', type: 'textarea', required: true, placeholder: 'Tell us about your project or inquiry...' }
          ];
          setFields(contactFields);
          const initialData: Record<string, string> = {};
          contactFields.forEach(f => initialData[f.id] = '');
          setFormData(initialData);
          setStatus('idle');
        }
      }

    } catch (e) {
      console.error('Failed to load form config', e);
      setStatus('error');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formId: config?.id || 'contact_form_default',
          formName: config?.name || 'Contact Form'
        }),
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
      // Reset form
      const resetData: Record<string, string> = {};
      fields.forEach(f => resetData[f.id] = '');
      setFormData(resetData);

      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Contact form submit failed', error);
      setErrorMessage('Unable to send message. Please try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (status === 'loading') {
    return <div className="text-center py-8 text-text-secondary">Loading form...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
      {fields.map((field, idx) => (
        <motion.div
          key={field.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * (idx + 1) }}
        >
          <label htmlFor={field.id} className="block text-sm font-bold text-text-primary mb-2 text-mono uppercase">
            {field.label} {field.required && '*'}
          </label>
          <div className="relative">
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                name={field.id}
                required={field.required}
                rows={6}
                value={formData[field.id] || ''}
                onChange={handleChange}
                onFocus={() => setFocusedField(field.id)}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 bg-dark-lighter border ${focusedField === field.id ? 'border-cyber-green shadow-glow' : 'border-dark-card/50'
                  } rounded-lg text-text-primary placeholder-text-muted transition-all duration-300 resize-none
                focus:outline-none focus:border-cyber-green focus:shadow-glow`}
                placeholder={field.placeholder}
              />
            ) : (
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                required={field.required}
                value={formData[field.id] || ''}
                onChange={handleChange}
                onFocus={() => setFocusedField(field.id)}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 bg-dark-lighter border ${focusedField === field.id ? 'border-cyber-blue shadow-glow' : 'border-dark-card/50'
                  } rounded-lg text-text-primary placeholder-text-muted transition-all duration-300
                focus:outline-none focus:border-cyber-blue focus:shadow-glow`}
                placeholder={field.placeholder}
              />
            )}

            {focusedField === field.id && (
              <motion.div
                layoutId="focusIndicator"
                className={`absolute inset-0 rounded-lg border-2 pointer-events-none ${field.type === 'textarea' ? 'border-cyber-green' : 'border-cyber-blue'
                  }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </div>
        </motion.div>
      ))}

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
