'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUserTie, FaChartLine } from 'react-icons/fa';

export default function CIOaaSPage() {
  return (
    <>
      <section className="relative bg-white dark:bg-dark py-24 border-b border-gray-100 dark:border-dark-lighter">
        <div className="container-custom text-center">
          <motion.h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>CIO as a Service (CIOaaS)</motion.h1>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">Strategic IT leadership, budgeting and roadmap services to align technology with business outcomes.</p>
          <Link href="/contact" className="btn-primary">Discuss CIO Support</Link>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-dark">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-cyber p-6">
              <h3 className="font-semibold mb-2">Strategy & Roadmap</h3>
              <p className="text-text-secondary text-sm">Technology roadmaps and investment planning focused on measurable business impact.</p>
            </div>
            <div className="card-cyber p-6">
              <h3 className="font-semibold mb-2">Operational Excellence</h3>
              <p className="text-text-secondary text-sm">Driving operational improvements, vendor management and delivery governance.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
