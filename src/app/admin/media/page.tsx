"use client";
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { motion } from 'framer-motion';
import { FaUpload, FaTrash, FaDownload, FaImage, FaFileVideo, FaFilePdf, FaSearch } from 'react-icons/fa';

export default function MediaLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => { fetchMedia(); }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media');
      if (res.ok) setMedia(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Only images are currently supported');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/media/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const item = await res.json();
        setMedia(prev => [...prev, item]);
        alert('Upload successful!');
      } else {
        const err = await res.json();
        alert('Upload failed: ' + (err?.error || 'Unknown error'));
      }
    } catch (e) {
      console.error(e);
      alert('Upload error');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (uploading) return;
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleUpload(files[0]);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this media?')) return;
    try {
      const res = await fetch(`/api/media?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMedia(prev => prev.filter(m => m.id !== id));
      } else {
        alert('Delete failed');
      }
    } catch (e) {
      console.error(e);
      alert('Error');
    }
  };

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
                <button onClick={() => handleDelete(item.id)} className="p-2 text-cyber-red hover:bg-cyber-red/20 rounded transition-colors">
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
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
        className={`mt-8 card-dark p-12 border-2 border-dashed transition-colors cursor-pointer ${dragActive ? 'border-cyber-green bg-cyber-green/5' : 'border-dark-border hover:border-cyber-green'}`}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
          disabled={uploading}
          className="hidden"
        />
        <div className="text-center">
          <FaUpload className={`text-6xl ${uploading ? 'text-text-secondary' : 'text-cyber-green'} mx-auto mb-4 ${uploading ? 'animate-bounce' : ''}`} />
          <h3 className="text-xl font-bold text-text-primary mb-2">{uploading ? 'Uploading...' : 'Drop files here to upload'}</h3>
          <p className="text-text-secondary mb-4">{uploading ? 'Please wait' : 'or click to browse from your computer'}</p>
          <p className="text-text-muted text-sm">Supported: JPG, PNG, GIF, WebP (Max 50MB)</p>
        </div>
      </motion.div>
    </AdminShell>
  );
}
