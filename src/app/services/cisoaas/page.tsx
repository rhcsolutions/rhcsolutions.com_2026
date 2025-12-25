'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUserShield, FaLock } from 'react-icons/fa';

export default function CISOaaSPage() {
  return (
    <>
      <section className="relative bg-white dark:bg-dark py-24 border-b border-gray-100 dark:border-dark-lighter">
        <div className="container-custom text-center">
          <motion.h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>CISO as a Service (CISOaaS)</motion.h1>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">Fractional Chief Information Security Officer services to lead your security strategy, risk management and compliance programs without the overhead of a full-time hire.</p>
          <Link href="/contact" className="btn-primary">Book a CISO Consultation</Link>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-dark">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-cyber p-6">
              <h3 className="font-semibold mb-2">Security Leadership</h3>
              <p className="text-text-secondary text-sm">Governance, strategy and program management driven by experienced security leaders.</p>
            </div>
            <div className="card-cyber p-6">
              <h3 className="font-semibold mb-2">Risk & Compliance</h3>
              <p className="text-text-secondary text-sm">Risk assessments, policy development and compliance frameworks tailored to your organisation.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
