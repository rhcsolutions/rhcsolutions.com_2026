'use client';
import { useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { motion } from 'framer-motion';
import { FaUpload, FaTrash, FaDownload, FaImage, FaFileVideo, FaFilePdf, FaSearch } from 'react-icons/fa';

export default function MediaLibrary() {
  const [searchTerm, setSearchTerm] = useState('');

  const media = [
    { id: 1, name: 'hero-image.jpg', type: 'image', size: '2.4 MB', uploaded: '2025-12-15', url: '/images/hero.jpg' },
    { id: 2, name: 'company-logo.png', type: 'image', size: '156 KB', uploaded: '2025-12-14', url: '/logo.png' },
    { id: 3, name: 'services-video.mp4', type: 'video', size: '45.2 MB', uploaded: '2025-12-13', url: '/videos/services.mp4' },
    { id: 4, name: 'whitepaper.pdf', type: 'document', size: '1.8 MB', uploaded: '2025-12-12', url: '/docs/whitepaper.pdf' },
    { id: 5, name: 'team-photo.jpg', type: 'image', size: '3.1 MB', uploaded: '2025-12-11', url: '/images/team.jpg' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'image': return FaImage;
      case 'video': return FaFileVideo;
      case 'document': return FaFilePdf;
      default: return FaImage;
    }
  };

  return (
    <AdminShell title="Media Library">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="heading-xl text-gradient mb-2">Media Library</h1>
          <p className="text-text-secondary">Manage your images, videos, and documents</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <FaUpload />
          <span>Upload Media</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card-cyber p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 pl-12 pr-4 text-text-primary 
                       focus:border-cyber-green focus:outline-none transition-colors"
            />
          </div>
          <select className="bg-dark-card border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary focus:border-cyber-cyan focus:outline-none">
            <option>All Types</option>
            <option>Images</option>
            <option>Videos</option>
            <option>Documents</option>
          </select>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {media.map((item, idx) => {
          const Icon = getIcon(item.type);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="card-cyber p-4 group hover:border-cyber-green transition-all"
            >
              <div className="aspect-square bg-dark-lighter rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                <Icon className="text-6xl text-cyber-green group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60" />
              </div>
              <h3 className="text-text-primary font-semibold mb-2 truncate">{item.name}</h3>
              <p className="text-text-secondary text-sm mb-3">{item.size} • {item.uploaded}</p>
              <div className="flex items-center space-x-2">
                <button className="flex-1 btn-secondary py-2 text-sm flex items-center justify-center space-x-1">
                  <FaDownload />
                  <span>Download</span>
                </button>
                <button className="p-2 text-cyber-red hover:bg-cyber-red/20 rounded transition-colors">
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 card-dark p-12 border-2 border-dashed border-dark-border hover:border-cyber-green transition-colors cursor-pointer"
      >
        <div className="text-center">
          <FaUpload className="text-6xl text-cyber-green mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-primary mb-2">Drop files here to upload</h3>
          <p className="text-text-secondary mb-4">or click to browse from your computer</p>
          <p className="text-text-muted text-sm">Supported: JPG, PNG, GIF, MP4, PDF (Max 50MB)</p>
        </div>
      </motion.div>
    </AdminShell>
  );
}
