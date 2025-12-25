'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEdit, FaEye, FaSearch, FaTimes, FaSave, FaExternalLinkAlt, 
  FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaAlignLeft, FaAlignCenter, FaAlignRight,
  FaColumns, FaTh, FaQuoteRight, FaCode
} from 'react-icons/fa';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface ContentBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'button' | 'list' | 'cards' | 'hero' | 'cta' | 'columns' | 'testimonial';
  content: any;
  styles?: {
    align?: 'left' | 'center' | 'right';
    level?: number;
    columns?: number;
    background?: string;
    padding?: string;
  };
}

interface CMSPage {
  id: string;
  title: string;
  slug: string;
  description?: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  blocks: ContentBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export default function CMSPagesEditor() {
  const { data: session } = useSession();
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingPage, setEditingPage] = useState<CMSPage | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/cms/pages', {
        credentials: 'include',
        cache: 'no-store',
      });
      if (!res.ok) {
        console.error('Fetch /api/cms/pages failed with status:', res.status);
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setPages(data);
    } catch (error) {
      console.error('Failed to fetch pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: CMSPage) => {
    setEditingPage(JSON.parse(JSON.stringify(page))); // Deep clone
    setShowEditor(true);
    setSelectedBlockId(null);
  };

  const handleSave = async () => {
    if (!editingPage) return;

    setSaving(true);
    try {
      const method = editingPage.id === 'new' ? 'POST' : 'PUT';
      const res = await fetch('/api/cms/pages', {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...editingPage,
          updatedBy: (session?.user as any)?.email || (session?.user as any)?.name || 'admin',
        }),
      });

      if (res.ok) {
        alert('✓ Page saved successfully!');
        setShowEditor(false);
        fetchPages();
      } else {
        alert('Failed to save page');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save page');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const res = await fetch(`/api/cms/pages?id=${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) {
        setPages(pages.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete page');
    }
  };

  const handleNewPage = () => {
    setEditingPage({
      id: 'new',
      title: 'New Page',
      slug: '/new-page',
      category: 'Main',
      status: 'draft',
      blocks: [],
      createdBy: (session?.user as any)?.email || (session?.user as any)?.name || 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    setShowEditor(true);
  };

  const updateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    if (!editingPage) return;
    
    setEditingPage({
      ...editingPage,
      blocks: editingPage.blocks.map(block =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    });
  };

  const addBlock = (type: ContentBlock['type']) => {
    if (!editingPage) return;
    
    let content: any;
    let styles: any = { align: 'left' };

    switch (type) {
      case 'hero':
        content = { title: 'Hero Title', subtitle: 'Subtitle text', cta: { text: 'Get Started', url: '#' } };
        styles.align = 'center';
        break;
      case 'cards':
        content = { cards: [
          { title: 'Card 1', description: 'Card description', icon: '🚀' },
          { title: 'Card 2', description: 'Card description', icon: '⚡' },
          { title: 'Card 3', description: 'Card description', icon: '🎯' }
        ]};
        styles.columns = 3;
        break;
      case 'columns':
        content = { columns: [
          { content: 'Column 1 content...' },
          { content: 'Column 2 content...' }
        ]};
        styles.columns = 2;
        break;
      case 'testimonial':
        content = { quote: 'Great service!', author: 'John Doe', role: 'CEO, Company' };
        break;
      case 'heading':
        content = 'New Heading';
        styles.level = 2;
        break;
      case 'image':
        content = '/uploads/image.jpg';
        break;
      case 'button':
        content = { text: 'Button Text', url: '#' };
        break;
      case 'list':
        content = '• Item 1\n• Item 2\n• Item 3';
        break;
      default:
        content = 'New paragraph text...';
    }
    
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content,
      styles
    };
    
    setEditingPage({
      ...editingPage,
      blocks: [...editingPage.blocks, newBlock]
    });
  };

  const deleteBlock = (blockId: string) => {
    if (!editingPage) return;
    
    setEditingPage({
      ...editingPage,
      blocks: editingPage.blocks.filter(block => block.id !== blockId)
    });
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    if (!editingPage) return;
    
    const blocks = [...editingPage.blocks];
    const index = blocks.findIndex(b => b.id === blockId);
    
    if (direction === 'up' && index > 0) {
      [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]];
    } else if (direction === 'down' && index < blocks.length - 1) {
      [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
    }
    
    setEditingPage({ ...editingPage, blocks });
  };

  const renderBlockEditor = (block: ContentBlock) => {
    switch (block.type) {
      case 'hero':
        return (
          <div className="space-y-3">
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => updateBlock(block.id, { content: { ...block.content, title: e.target.value }})}
              placeholder="Hero title"
              className="w-full bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
            />
            <input
              type="text"
              value={block.content.subtitle || ''}
              onChange={(e) => updateBlock(block.id, { content: { ...block.content, subtitle: e.target.value }})}
              placeholder="Hero subtitle"
              className="w-full bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={block.content.cta?.text || ''}
                onChange={(e) => updateBlock(block.id, { content: { ...block.content, cta: { ...block.content.cta, text: e.target.value }}})}
                placeholder="Button text"
                className="bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
              />
              <input
                type="text"
                value={block.content.cta?.url || ''}
                onChange={(e) => updateBlock(block.id, { content: { ...block.content, cta: { ...block.content.cta, url: e.target.value }}})}
                placeholder="Button URL"
                className="bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
              />
            </div>
          </div>
        );
      case 'heading':
        return (
          <input
            type="text"
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            placeholder="Heading text"
            className="w-full bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
          />
        );
      case 'paragraph':
      case 'list':
        return (
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            className="w-full bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm min-h-[80px] resize-none"
            placeholder="Enter content..."
          />
        );
      case 'image':
        return (
          <input
            type="text"
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            placeholder="/uploads/image.jpg"
            className="w-full bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
          />
        );
      case 'button':
        return (
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={block.content.text || ''}
              onChange={(e) => updateBlock(block.id, { content: { ...block.content, text: e.target.value }})}
              placeholder="Button text"
              className="bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
            />
            <input
              type="text"
              value={block.content.url || ''}
              onChange={(e) => updateBlock(block.id, { content: { ...block.content, url: e.target.value }})}
              placeholder="URL"
              className="bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
            />
          </div>
        );
      case 'testimonial':
        return (
          <div className="space-y-2">
            <textarea
              value={block.content.quote || ''}
              onChange={(e) => updateBlock(block.id, { content: { ...block.content, quote: e.target.value }})}
              placeholder="Quote text..."
              className="w-full bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm min-h-[60px] resize-none"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={block.content.author || ''}
                onChange={(e) => updateBlock(block.id, { content: { ...block.content, author: e.target.value }})}
                placeholder="Author"
                className="bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
              />
              <input
                type="text"
                value={block.content.role || ''}
                onChange={(e) => updateBlock(block.id, { content: { ...block.content, role: e.target.value }})}
                placeholder="Role"
                className="bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
              />
            </div>
          </div>
        );
      default:
        return <div className="text-text-muted text-sm">Complex block - edit via JSON</div>;
    }
  };

  const renderBlockPreview = (block: ContentBlock) => {
    const alignClass = 
      block.styles?.align === 'center' ? 'text-center' :
      block.styles?.align === 'right' ? 'text-right' : '';
    
    switch (block.type) {
      case 'hero':
        return (
          <div className={`bg-gradient-to-r from-cyber-green/10 to-cyber-cyan/10 p-8 rounded ${alignClass}`}>
            <h1 className="text-4xl font-bold text-gradient mb-2">{block.content.title}</h1>
            <p className="text-xl text-text-secondary mb-4">{block.content.subtitle}</p>
            <button className="btn-primary">{block.content.cta?.text}</button>
          </div>
        );
      case 'heading':
        const level = block.styles?.level || 2;
        return (
          <div className={`text-gradient font-bold ${alignClass}`}>
            {level === 1 ? <div className="text-4xl">{block.content}</div> :
             level === 2 ? <div className="text-3xl">{block.content}</div> :
             <div className="text-2xl">{block.content}</div>}
          </div>
        );
      case 'paragraph':
        return <p className={`text-text-secondary ${alignClass}`}>{block.content}</p>;
      case 'button':
        return (
          <div className={alignClass}>
            <button className="btn-primary">{block.content.text}</button>
          </div>
        );
      case 'image':
        return (
          <div className={alignClass}>
            <div className="inline-block bg-dark-lighter p-4 rounded border border-cyber-green/30">
              <div className="text-4xl text-cyber-green">📷</div>
              <p className="text-xs text-text-muted mt-2">{block.content}</p>
            </div>
          </div>
        );
      case 'list':
        return <div className="text-text-secondary whitespace-pre-line">{block.content}</div>;
      case 'testimonial':
        return (
          <div className="bg-dark-card p-6 rounded border-l-4 border-cyber-green">
            <FaQuoteRight className="text-3xl text-cyber-green/30 mb-3" />
            <p className="text-text-primary italic mb-4">"{block.content.quote}"</p>
            <div className="text-text-secondary text-sm">
              <strong>{block.content.author}</strong> - {block.content.role}
            </div>
          </div>
        );
      default:
        return <div className="text-text-muted">Block type: {block.type}</div>;
    }
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminShell title="CMS Pages">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="heading-xl text-gradient mb-2">Content Management</h1>
          <p className="text-text-secondary">Create and manage your site pages</p>
        </div>
        <button onClick={handleNewPage} className="btn-primary flex items-center space-x-2">
          <FaPlus />
          <span>New Page</span>
        </button>
      </div>

      {/* Search */}
      <div className="card-cyber p-6 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 pl-12 pr-4 text-text-primary 
                     focus:border-cyber-green focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Pages Table */}
      {loading ? (
        <div className="text-center py-12 text-text-muted">Loading pages...</div>
      ) : (
        <div className="card-cyber p-0 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-dark-lighter text-text-secondary">
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3">Slug</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Creator</th>
                <th className="text-left px-4 py-3">Last Edited</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.map((page) => (
                <tr key={page.id} className="border-t border-dark-border hover:bg-dark-lighter/50">
                  <td className="px-4 py-3 font-medium text-text-primary">{page.title}</td>
                  <td className="px-4 py-3 font-mono text-text-muted">{page.slug}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      page.status === 'published' ? 'bg-cyber-green/20 text-cyber-green' :
                      page.status === 'draft' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-text-muted/20 text-text-muted'
                    }`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{page.category}</td>
                  <td className="px-4 py-3">{(page as any).createdBy || '—'}</td>
                  <td className="px-4 py-3">{new Date(page.updatedAt).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Link href={page.slug} target="_blank" className="p-2 text-cyber-cyan hover:bg-cyber-cyan/20 rounded transition-colors">
                        <FaExternalLinkAlt />
                      </Link>
                      <button onClick={() => handleEdit(page)} className="btn-primary px-3 py-1">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(page.id)} className="p-2 text-cyber-red hover:bg-cyber-red/20 rounded transition-colors">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* WYSIWYG Editor Modal */}
      <AnimatePresence>
        {showEditor && editingPage && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-dark border-2 border-cyber-green rounded-xl w-full max-w-7xl my-8"
            >
              {/* Editor Header */}
              <div className="border-b border-cyber-green/30 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={editingPage.title}
                      onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                      className="text-2xl font-bold text-gradient bg-transparent border-none outline-none w-full"
                      placeholder="Page Title"
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={editingPage.slug}
                        onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                        className="bg-dark-card border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                        placeholder="/page-url"
                      />
                      <select
                        value={editingPage.status}
                        onChange={(e) => setEditingPage({ ...editingPage, status: e.target.value as any })}
                        className="bg-dark-card border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                      <input
                        type="text"
                        value={editingPage.category}
                        onChange={(e) => setEditingPage({ ...editingPage, category: e.target.value })}
                        className="bg-dark-card border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                        placeholder="Category"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 ml-4">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <FaSave />
                      <span>{saving ? 'Saving...' : 'Save'}</span>
                    </button>
                    <button
                      onClick={() => setShowEditor(false)}
                      className="text-text-secondary hover:text-cyber-red transition-colors"
                    >
                      <FaTimes className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Editor Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 min-h-[600px]">
                {/* Editor Panel */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-text-primary">Content Blocks</h3>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => addBlock('hero')} className="px-2 py-1 bg-dark-card hover:bg-dark-lighter border border-cyber-green rounded text-cyber-green text-xs">
                        Hero
                      </button>
                      <button onClick={() => addBlock('heading')} className="px-2 py-1 bg-dark-card hover:bg-dark-lighter border border-cyber-cyan rounded text-cyber-cyan text-xs">
                        Heading
                      </button>
                      <button onClick={() => addBlock('paragraph')} className="px-2 py-1 bg-dark-card hover:bg-dark-lighter border border-dark-border rounded text-text-secondary text-xs">
                        Text
                      </button>
                      <button onClick={() => addBlock('button')} className="px-2 py-1 bg-dark-card hover:bg-dark-lighter border border-dark-border rounded text-text-secondary text-xs">
                        Button
                      </button>
                      <button onClick={() => addBlock('testimonial')} className="px-2 py-1 bg-dark-card hover:bg-dark-lighter border border-dark-border rounded text-text-secondary text-xs">
                        <FaQuoteRight className="inline mr-1" />
                        Quote
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 max-h-[calc(100vh-350px)] overflow-y-auto pr-2">
                    {editingPage.blocks.map((block, index) => (
                      <div
                        key={block.id}
                        className={`bg-dark-card border-2 rounded-lg p-4 ${
                          selectedBlockId === block.id ? 'border-cyber-green' : 'border-dark-border'
                        }`}
                        onClick={() => setSelectedBlockId(block.id)}
                      >
                        {/* Block Controls */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono text-text-muted uppercase">{block.type}</span>
                            {block.type === 'heading' && (
                              <select
                                value={block.styles?.level}
                                onChange={(e) => updateBlock(block.id, { styles: { ...block.styles, level: parseInt(e.target.value) }})}
                                className="text-xs bg-dark border border-dark-border rounded px-2 py-1 text-text-primary"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <option value={1}>H1</option>
                                <option value={2}>H2</option>
                                <option value={3}>H3</option>
                              </select>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            {/* Alignment */}
                            <button
                              onClick={(e) => { e.stopPropagation(); updateBlock(block.id, { styles: { ...block.styles, align: 'left' }}); }}
                              className={`p-1 rounded ${block.styles?.align === 'left' ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-muted hover:text-text-primary'}`}
                            >
                              <FaAlignLeft className="text-sm" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); updateBlock(block.id, { styles: { ...block.styles, align: 'center' }}); }}
                              className={`p-1 rounded ${block.styles?.align === 'center' ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-muted hover:text-text-primary'}`}
                            >
                              <FaAlignCenter className="text-sm" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); updateBlock(block.id, { styles: { ...block.styles, align: 'right' }}); }}
                              className={`p-1 rounded ${block.styles?.align === 'right' ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-muted hover:text-text-primary'}`}
                            >
                              <FaAlignRight className="text-sm" />
                            </button>
                            <div className="w-px h-4 bg-dark-border mx-1" />
                            {/* Move */}
                            <button
                              onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 'up'); }}
                              disabled={index === 0}
                              className="p-1 text-cyber-cyan hover:bg-cyber-cyan/20 rounded disabled:opacity-30"
                            >
                              <FaArrowUp className="text-sm" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 'down'); }}
                              disabled={index === editingPage.blocks.length - 1}
                              className="p-1 text-cyber-cyan hover:bg-cyber-cyan/20 rounded disabled:opacity-30"
                            >
                              <FaArrowDown className="text-sm" />
                            </button>
                            {/* Delete */}
                            <button
                              onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }}
                              className="p-1 text-cyber-red hover:bg-cyber-red/20 rounded"
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          </div>
                        </div>

                        {/* Block Editor */}
                        <div onClick={(e) => e.stopPropagation()}>
                          {renderBlockEditor(block)}
                        </div>
                      </div>
                    ))}
                    
                    {editingPage.blocks.length === 0 && (
                      <div className="text-center text-text-muted py-12">
                        <p>No content blocks yet</p>
                        <p className="text-sm mt-2">Click a button above to add content</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Live Preview Panel */}
                <div className="bg-dark-card rounded-lg p-8 border border-dark-border overflow-y-auto max-h-[calc(100vh-350px)]">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-dark-border">
                    <h3 className="text-lg font-bold text-text-primary">Live Preview</h3>
                    <FaEye className="text-cyber-cyan" />
                  </div>
                  
                  <div className="space-y-6">
                    {editingPage.blocks.map((block) => (
                      <div
                        key={block.id}
                        className={`transition-all ${selectedBlockId === block.id ? 'ring-2 ring-cyber-green rounded p-2' : ''}`}
                      >
                        {renderBlockPreview(block)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminShell>
  );
}
