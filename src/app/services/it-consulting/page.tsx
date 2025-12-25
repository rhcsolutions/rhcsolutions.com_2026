'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaTools, FaCogs } from 'react-icons/fa';

export default function ITConsultingPage() {
  return (
    <>
      <section className="relative bg-white dark:bg-dark py-24 border-b border-gray-100 dark:border-dark-lighter">
        <div className="container-custom text-center">
          <motion.h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>IT Consulting & Professional Services</motion.h1>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">Comprehensive consulting, high-level and low-level design, proof-of-concept, testing and implementation services to deliver reliable IT projects.</p>
          <Link href="/contact" className="btn-primary">Get in Touch</Link>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-dark">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-cyber p-6 text-center">
              <FaProjectDiagram className="text-3xl text-cyber-blue mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Strategy & Architecture</h3>
              <p className="text-text-secondary text-sm">High-level and low-level design, solution architecture and technology roadmaps aligned to business goals.</p>
            </div>
            <div className="card-cyber p-6 text-center">
              <FaTools className="text-3xl text-cyber-cyan mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Proofs of Concept</h3>
              <p className="text-text-secondary text-sm">Validated POCs to de-risk projects and prove feasibility before full implementation.</p>
            </div>
            <div className="card-cyber p-6 text-center">
              <FaCogs className="text-3xl text-cyber-green mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Implementation & Testing</h3>
              <p className="text-text-secondary text-sm">Project delivery, acceptance testing, automation and operational handover with robust documentation.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
