'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUpload, FaTimes, FaImage, FaFileVideo, FaFilePdf, FaCheck, FaSearch 
} from 'react-icons/fa';

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  uploadedAt: string;
  alt?: string;
  caption?: string;
}

interface MediaPickerProps {
  onSelect: (url: string) => void;
  onClose: () => void;
  allowedTypes?: ('image' | 'video' | 'document')[];
}

export default function MediaPicker({ 
  onSelect, 
  onClose, 
  allowedTypes = ['image', 'video'] 
}: MediaPickerProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/cms/media', {
        credentials: 'include',
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        setMedia(data.filter((item: MediaItem) => allowedTypes.includes(item.type)));
      }
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    const fileType = file.type.startsWith('image/') ? 'image' : 
                     file.type.startsWith('video/') ? 'video' : 'document';
    
    if (!allowedTypes.includes(fileType as any)) {
      alert(`Only ${allowedTypes.join(', ')} files are allowed`);
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/cms/media', { 
        method: 'POST', 
        body: formData,
        credentials: 'include',
      });
      
      if (res.ok) {
        const item = await res.json();
        setMedia(prev => [item, ...prev]);
        setSelectedUrl(item.url);
      } else {
        const err = await res.json();
        alert('Upload failed: ' + (err?.error || 'Unknown error'));
      }
    } catch (e) {
      console.error(e);
      alert('Upload failed');
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

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUpload(files[0]);
    }
  };

  const handleSelect = () => {
    if (selectedUrl) {
      onSelect(selectedUrl);
      onClose();
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

  const filteredMedia = media.filter(item => 
    item.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-dark border-2 border-cyber-green rounded-xl w-full max-w-6xl my-8"
      >
        {/* Header */}
        <div className="border-b border-cyber-green/30 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gradient mb-1">Media Library</h2>
            <p className="text-text-secondary text-sm">
              Select or upload {allowedTypes.join(' or ')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-cyber-red transition-colors"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Upload Area */}
        <div className="p-6 border-b border-dark-border">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-cyber-green bg-cyber-green/10' : 'border-dark-border hover:border-cyber-cyan'
            }`}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileInput}
              accept={allowedTypes.map(t => 
                t === 'image' ? 'image/*' : 
                t === 'video' ? 'video/*' : 
                '.pdf,.doc,.docx'
              ).join(',')}
              disabled={uploading}
            />
            <label
              htmlFor="file-upload"
              className={`cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FaUpload className="text-5xl text-cyber-cyan mx-auto mb-4" />
              <p className="text-text-primary font-semibold mb-2">
                {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-text-secondary text-sm">
                {allowedTypes.includes('image') && 'PNG, JPG, GIF up to 10MB'}
                {allowedTypes.includes('video') && ' • MP4, WEBM up to 50MB'}
              </p>
            </label>
          </div>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-dark-border">
          <div className="relative">
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
        </div>

        {/* Media Grid */}
        <div className="p-6 max-h-[500px] overflow-y-auto">
          {loading ? (
            <div className="text-center py-12 text-text-muted">Loading media...</div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-12 text-text-muted">
              {searchTerm ? 'No media found matching your search' : 'No media uploaded yet'}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMedia.map((item) => {
                const Icon = getIcon(item.type);
                const isSelected = selectedUrl === item.url;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      isSelected 
                        ? 'border-cyber-green ring-2 ring-cyber-green' 
                        : 'border-dark-border hover:border-cyber-cyan'
                    }`}
                    onClick={() => setSelectedUrl(item.url)}
                  >
                    <div className="aspect-square bg-dark-lighter flex items-center justify-center relative">
                      {item.type === 'image' ? (
                        <img 
                          src={item.url} 
                          alt={item.alt || item.filename}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon className="text-4xl text-cyber-green" />
                      )}
                      {isSelected && (
                        <div className="absolute inset-0 bg-cyber-green/20 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-cyber-green flex items-center justify-center">
                            <FaCheck className="text-2xl text-dark" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-2 bg-dark-card">
                      <p className="text-xs text-text-primary truncate">{item.filename}</p>
                      <p className="text-xs text-text-muted">{formatFileSize(item.size)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-dark-border p-6 flex items-center justify-between">
          <p className="text-text-secondary text-sm">
            {selectedUrl ? 'Media selected' : 'Select a media item'}
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-dark-border text-text-secondary hover:bg-dark-lighter transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSelect}
              disabled={!selectedUrl}
              className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Select
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
