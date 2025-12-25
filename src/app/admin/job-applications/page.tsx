'use client';
import { useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaEye, FaCheck, FaTimes, FaFilter } from 'react-icons/fa';

// Mock applications data - In production, this would come from a database
const mockApplications = [
  {
    id: 1,
    jobId: 1,
    jobTitle: 'Senior Cloud Infrastructure Engineer',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 234-5678',
    linkedin: 'https://linkedin.com/in/johnsmith',
    coverLetter: 'I am excited to apply for this position. With over 7 years of experience in cloud infrastructure...',
    appliedDate: '2025-12-15',
    status: 'New'
  },
  {
    id: 2,
    jobId: 1,
    jobTitle: 'Senior Cloud Infrastructure Engineer',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@example.com',
    phone: '+44 20 7946 0958',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    coverLetter: 'As a certified AWS Solutions Architect with extensive experience in designing and implementing...',
    appliedDate: '2025-12-14',
    status: 'Under Review'
  },
  {
    id: 3,
    jobId: 2,
    jobTitle: 'Cyber Security Analyst',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@example.com',
    phone: '+1 (555) 876-5432',
    linkedin: 'https://linkedin.com/in/michaelchen',
    coverLetter: 'With CISSP certification and 5 years of hands-on experience in threat detection and response...',
    appliedDate: '2025-12-13',
    status: 'Interview'
  },
  {
    id: 4,
    jobId: 3,
    jobTitle: 'DevOps Engineer',
    firstName: 'Emma',
    lastName: 'Williams',
    email: 'emma.w@example.com',
    phone: '+1 (555) 345-6789',
    linkedin: 'https://linkedin.com/in/emmawilliams',
    coverLetter: 'I have been working with Kubernetes and Docker for the past 4 years, building scalable CI/CD pipelines...',
    appliedDate: '2025-12-16',
    status: 'New'
  },
  {
    id: 5,
    jobId: 3,
    jobTitle: 'DevOps Engineer',
    firstName: 'David',
    lastName: 'Rodriguez',
    email: 'david.r@example.com',
    phone: '+34 91 123 4567',
    linkedin: 'https://linkedin.com/in/davidrodriguez',
    coverLetter: 'My expertise in GitLab CI, Terraform, and AWS has enabled me to deliver robust automation solutions...',
    appliedDate: '2025-12-12',
    status: 'Rejected'
  }
];

export default function JobApplications() {
  const [applications, setApplications] = useState(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<typeof mockApplications[0] | null>(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterJob, setFilterJob] = useState('All');

  const uniqueJobs = Array.from(new Set(applications.map(app => app.jobTitle)));
  const statuses = ['New', 'Under Review', 'Interview', 'Rejected', 'Hired'];

  const filteredApplications = applications.filter(app => {
    const statusMatch = filterStatus === 'All' || app.status === filterStatus;
    const jobMatch = filterJob === 'All' || app.jobTitle === filterJob;
    return statusMatch && jobMatch;
  });

  const handleStatusChange = (id: number, newStatus: string) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'cyber-green';
      case 'Under Review': return 'cyber-cyan';
      case 'Interview': return 'cyber-blue';
      case 'Rejected': return 'cyber-red';
      case 'Hired': return 'cyber-purple';
      default: return 'text-muted';
    }
  };

  return (
    <AdminShell title="Job Applications">
      {/* Header */}
      <div className="mb-8">
        <h1 className="heading-xl text-gradient mb-2">Job Applications</h1>
        <p className="text-text-secondary">Review and manage candidate applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="card-cyber p-6">
          <h3 className="text-2xl font-bold text-text-primary">{applications.length}</h3>
          <p className="text-text-secondary text-sm">Total Applications</p>
        </div>
        <div className="card-cyber p-6">
          <h3 className="text-2xl font-bold text-cyber-green">{applications.filter(a => a.status === 'New').length}</h3>
          <p className="text-text-secondary text-sm">New</p>
        </div>
        <div className="card-cyber p-6">
          <h3 className="text-2xl font-bold text-cyber-cyan">{applications.filter(a => a.status === 'Under Review').length}</h3>
          <p className="text-text-secondary text-sm">Under Review</p>
        </div>
        <div className="card-cyber p-6">
          <h3 className="text-2xl font-bold text-cyber-blue">{applications.filter(a => a.status === 'Interview').length}</h3>
          <p className="text-text-secondary text-sm">Interview</p>
        </div>
        <div className="card-cyber p-6">
          <h3 className="text-2xl font-bold text-cyber-purple">{applications.filter(a => a.status === 'Hired').length}</h3>
          <p className="text-text-secondary text-sm">Hired</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card-cyber p-6 mb-6">
        <div className="flex items-center space-x-4">
          <FaFilter className="text-cyber-green" />
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary text-sm font-semibold mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-dark-card border-2 border-dark-border rounded-lg px-4 py-2 text-text-primary 
                         focus:border-cyber-green focus:outline-none"
              >
                <option>All</option>
                {statuses.map(status => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-text-primary text-sm font-semibold mb-2">Filter by Position</label>
              <select
                value={filterJob}
                onChange={(e) => setFilterJob(e.target.value)}
                className="w-full bg-dark-card border-2 border-dark-border rounded-lg px-4 py-2 text-text-primary 
                         focus:border-cyber-cyan focus:outline-none"
              >
                <option>All</option>
                {uniqueJobs.map(job => (
                  <option key={job}>{job}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="card-cyber overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-lighter">
              <tr>
                <th className="text-left p-4 text-text-primary font-semibold">Candidate</th>
                <th className="text-left p-4 text-text-primary font-semibold">Position</th>
                <th className="text-left p-4 text-text-primary font-semibold">Contact</th>
                <th className="text-left p-4 text-text-primary font-semibold">Applied</th>
                <th className="text-left p-4 text-text-primary font-semibold">Status</th>
                <th className="text-right p-4 text-text-primary font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app, idx) => (
                <motion.tr
                  key={app.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-t border-dark-border hover:bg-dark-lighter transition-colors"
                >
                  <td className="p-4">
                    <div>
                      <p className="text-text-primary font-semibold">{app.firstName} {app.lastName}</p>
                      <a href={app.linkedin} target="_blank" rel="noopener noreferrer" 
                         className="text-cyber-blue text-sm hover:text-cyber-cyan flex items-center space-x-1">
                        <FaLinkedin />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </td>
                  <td className="p-4 text-text-secondary text-sm">{app.jobTitle}</td>
                  <td className="p-4">
                    <div className="space-y-1 text-sm">
                      <a href={`mailto:${app.email}`} className="flex items-center space-x-2 text-text-secondary hover:text-cyber-cyan">
                        <FaEnvelope />
                        <span>{app.email}</span>
                      </a>
                      <div className="flex items-center space-x-2 text-text-secondary font-mono text-xs">
                        <FaPhone />
                        <span>{app.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-text-secondary text-sm">{app.appliedDate}</td>
                  <td className="p-4">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold bg-${getStatusColor(app.status)}/20 text-${getStatusColor(app.status)} 
                                border-2 border-transparent focus:border-cyber-green focus:outline-none cursor-pointer`}
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedApplication(app)}
                      className="btn-secondary py-2 px-4 text-sm flex items-center space-x-2 ml-auto"
                    >
                      <FaEye />
                      <span>View</span>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-card border-2 border-cyber-green rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="heading-lg text-gradient mb-2">
                  {selectedApplication.firstName} {selectedApplication.lastName}
                </h2>
                <p className="text-cyber-cyan font-semibold">{selectedApplication.jobTitle}</p>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-text-secondary hover:text-cyber-red text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-6">
              {/* Contact Information */}
              <div className="card-dark p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-cyber-cyan" />
                    <a href={`mailto:${selectedApplication.email}`} className="text-text-secondary hover:text-cyber-cyan">
                      {selectedApplication.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaPhone className="text-cyber-green" />
                    <span className="text-text-secondary font-mono">{selectedApplication.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaLinkedin className="text-cyber-blue" />
                    <a href={selectedApplication.linkedin} target="_blank" rel="noopener noreferrer" 
                       className="text-text-secondary hover:text-cyber-blue">
                      View LinkedIn Profile →
                    </a>
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div className="card-dark p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">Application Details</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-text-muted text-sm">Applied Date</p>
                    <p className="text-text-primary font-semibold">{selectedApplication.appliedDate}</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Current Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-${getStatusColor(selectedApplication.status)}/20 text-${getStatusColor(selectedApplication.status)}`}>
                      {selectedApplication.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="card-dark p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">Cover Letter / Message</h3>
                <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {selectedApplication.coverLetter}
                </p>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    handleStatusChange(selectedApplication.id, 'Interview');
                    setSelectedApplication(null);
                  }}
                  className="flex-1 btn-primary py-3 flex items-center justify-center space-x-2"
                >
                  <FaCheck />
                  <span>Move to Interview</span>
                </button>
                <button
                  onClick={() => {
                    handleStatusChange(selectedApplication.id, 'Rejected');
                    setSelectedApplication(null);
                  }}
                  className="flex-1 bg-cyber-red/20 text-cyber-red hover:bg-cyber-red/30 py-3 rounded-lg font-semibold 
                           flex items-center justify-center space-x-2 transition-colors"
                >
                  <FaTimes />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AdminShell>
  );
}
