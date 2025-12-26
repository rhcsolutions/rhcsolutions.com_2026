'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import RichTextEditor from '@/components/admin/RichTextEditor';
import MediaPicker from '@/components/admin/MediaPicker';
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
  type: 'heading' | 'paragraph' | 'image' | 'button' | 'list' | 'cards' | 'hero' | 'cta' | 'columns' | 'testimonial' | 'richtext';
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
  menu?: {
    includeInNav?: boolean;
    label?: string;
    position?: string; // nav id to insert before, or 'end'
  };
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
    const [navigation, setNavigation] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingPage, setEditingPage] = useState<CMSPage | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaPickerCallback, setMediaPickerCallback] = useState<((url: string) => void) | null>(null);

  useEffect(() => {
    fetchPages();
    fetchSettings();
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

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/cms/settings', { credentials: 'include', cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      setNavigation(data?.navigation || []);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  const handleEdit = (page: CMSPage) => {
    console.log('📝 Editing page:', page.title, 'ID:', page.id);
    console.log('📦 Original blocks:', page.blocks);
    
    const cloned = JSON.parse(JSON.stringify(page)) as CMSPage;
    // Ensure blocks array exists
    if (!cloned.blocks) {
      console.warn('⚠️  No blocks found, initializing empty array');
      cloned.blocks = [];
    }
    
    console.log('✅ Cloned page with', cloned.blocks.length, 'blocks');
    const menuConfig = buildMenuConfig(cloned);
    console.log('🔧 Menu config:', menuConfig);
    
    setEditingPage({ ...cloned, menu: menuConfig }); // Deep clone with menu defaults
    setShowEditor(true);
    setSelectedBlockId(null);
    
    console.log('🎯 Editor should now be visible');
  };

  const handleSave = async () => {
    if (!editingPage) {
      console.error('❌ No page to save');
      alert('Error: No page data to save');
      return;
    }

    console.log('💾 Starting save for page:', editingPage.title);
    console.log('📝 Page data being sent:', JSON.stringify(editingPage, null, 2));
    
    setSaving(true);
    try {
      const method = editingPage.id === 'new' ? 'POST' : 'PUT';
      const payload = {
        ...editingPage,
        updatedBy: (session?.user as any)?.email || (session?.user as any)?.name || 'admin',
      };
      
      console.log('🚀 Sending', method, 'request to /api/cms/pages');
      
      const res = await fetch('/api/cms/pages', {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      console.log('📊 Response status:', res.status);
      
      if (res.ok) {
        const savedPage = await res.json();
        console.log('✅ Page saved successfully:', savedPage);
        
        await updateNavigation(savedPage as CMSPage);
        setShowEditor(false);
        fetchPages();
        fetchSettings();
        
        alert('✅ Page saved successfully!');
      } else {
        const errorText = await res.text();
        console.error('❌ Failed to save page. Status:', res.status, 'Response:', errorText);
        alert('❌ Failed to save page. Status: ' + res.status);
      }
    } catch (error) {
      console.error('❌ Save failed with error:', error);
      alert('❌ Error saving page: ' + (error instanceof Error ? error.message : 'Unknown error'));
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
      
    }
  };

  const handleNewPage = () => {
    const newPage: CMSPage = {
      id: 'new',
      title: 'New Page',
      slug: '/new-page',
      category: 'Main',
      status: 'draft',
      blocks: [],
      createdBy: (session?.user as any)?.email || (session?.user as any)?.name || 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as CMSPage;
    setEditingPage({ ...newPage, menu: buildMenuConfig(newPage) });
    setShowEditor(true);
    setSelectedBlockId(null);
  };

  const buildMenuConfig = (page: CMSPage): CMSPage['menu'] => {
    const navMatch = navigation.find((nav) => nav.url === page.slug);
    return {
      includeInNav: page.menu?.includeInNav ?? !!navMatch,
      label: page.menu?.label || navMatch?.label || page.title,
      position: page.menu?.position || navMatch?.id || 'end',
    };
  };

  const updateNavigation = async (pageData: CMSPage) => {
    try {
      const settingsRes = await fetch('/api/cms/settings', { credentials: 'include', cache: 'no-store' });
      if (!settingsRes.ok) return;
      const settings = await settingsRes.json();
      let nav = Array.isArray(settings?.navigation) ? [...settings.navigation] : [];

      // Remove existing entry for this page slug
      nav = nav.filter((item: any) => item.url !== pageData.slug);

      if (pageData.menu?.includeInNav) {
        const navItem = {
          id: pageData.id || Date.now().toString(),
          label: pageData.menu.label || pageData.title,
          url: pageData.slug,
        };

        const position = pageData.menu.position || 'end';
        if (position === 'start') {
          nav.unshift(navItem);
        } else if (position !== 'end') {
          const idx = nav.findIndex((item: any) => item.id === position);
          if (idx >= 0) {
            nav.splice(idx, 0, navItem);
          } else {
            nav.push(navItem);
          }
        } else {
          nav.push(navItem);
        }
      }

      const updateRes = await fetch('/api/cms/settings', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ navigation: nav }),
      });

      if (updateRes.ok) {
        setNavigation(nav);
      }
    } catch (error) {
      console.error('Failed to update navigation:', error);
    }
  };

  const updateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    if (!editingPage) return;
    
    console.log('🔧 Updating block:', blockId, 'with:', updates);
    
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
      case 'richtext':
        content = '<p>Start typing your content here...</p>';
        break;
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
      case 'richtext':
        return (
          <div className="space-y-2">
            <RichTextEditor
              content={block.content || ''}
              onChange={(html) => updateBlock(block.id, { content: html })}
              placeholder="Type your content here..."
              minHeight="150px"
            />
          </div>
        );
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
          <div className="space-y-2">
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="/uploads/image.jpg"
              className="w-full bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
            />
            <button
              onClick={() => {
                setShowMediaPicker(true);
                setMediaPickerCallback(() => (url: string) => {
                  updateBlock(block.id, { content: url });
                });
              }}
              className="w-full btn-secondary py-2 text-sm"
            >
              Select from Media Library
            </button>
          </div>
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
      case 'cards':
        return (
          <div className="space-y-4">
            <div className="text-sm text-text-secondary">Cards</div>
            {(block.content?.cards || []).map((card: any, idx: number) => (
              <div key={idx} className="bg-dark-lighter p-4 rounded border border-dark-border space-y-2">
                <input
                  type="text"
                  value={card.title || ''}
                  onChange={(e) => {
                    const cards = [...(block.content?.cards || [])];
                    cards[idx] = { ...card, title: e.target.value };
                    updateBlock(block.id, { content: { ...block.content, cards } });
                  }}
                  placeholder="Card title"
                  className="w-full bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                />
                <textarea
                  value={card.description || ''}
                  onChange={(e) => {
                    const cards = [...(block.content?.cards || [])];
                    cards[idx] = { ...card, description: e.target.value };
                    updateBlock(block.id, { content: { ...block.content, cards } });
                  }}
                  placeholder="Card description"
                  className="w-full bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm min-h-[60px] resize-none"
                />
                <input
                  type="text"
                  value={card.url || ''}
                  onChange={(e) => {
                    const cards = [...(block.content?.cards || [])];
                    cards[idx] = { ...card, url: e.target.value };
                    updateBlock(block.id, { content: { ...block.content, cards } });
                  }}
                  placeholder="Link URL (e.g. /services/professional-services)"
                  className="w-full bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                />
                <input
                  type="text"
                  value={card.icon || ''}
                  onChange={(e) => {
                    const cards = [...(block.content?.cards || [])];
                    cards[idx] = { ...card, icon: e.target.value };
                    updateBlock(block.id, { content: { ...block.content, cards } });
                  }}
                  placeholder="Icon (emoji or text)"
                  className="w-full bg-dark border border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                />
                <div className="flex justify-between items-center text-xs text-text-muted">
                  <span>Card {idx + 1}</span>
                  <button
                    onClick={() => {
                      const cards = (block.content?.cards || []).filter((_: any, i: number) => i !== idx);
                      updateBlock(block.id, { content: { ...block.content, cards } });
                    }}
                    className="text-cyber-red hover:bg-cyber-red/20 px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const cards = [...(block.content?.cards || [])];
                cards.push({ title: 'New Card', description: '', url: '', icon: '' });
                updateBlock(block.id, { content: { ...block.content, cards } });
              }}
              className="w-full btn-secondary py-2 text-sm"
            >
              Add Card
            </button>
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
      case 'richtext':
        return (
          <div 
            className={`prose prose-invert max-w-none ${alignClass}`}
            dangerouslySetInnerHTML={{ __html: block.content || '' }}
          />
        );
      case 'hero':
        return (
          <div className={`bg-gradient-to-r from-cyber-green/10 to-cyber-cyan/10 p-8 rounded ${alignClass}`}>
            <h1 className="text-4xl font-bold text-gradient mb-2">{block.content.title}</h1>
            <p className="text-xl text-text-secondary mb-4">{block.content.subtitle}</p>
            <button className="btn-primary">{block.content.cta?.text}</button>
          </div>
        );
      case 'cards':
        const cols = block.styles?.columns || 3;
        const gridCols = cols === 1 ? 'grid-cols-1' : cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';
        return (
          <div className={`grid grid-cols-1 ${gridCols} gap-4`}>
            {(block.content?.cards || []).map((card: any, i: number) => (
              <div key={i} className="card-cyber p-4 text-center">
                {card.icon && <div className="text-3xl mb-2">{card.icon}</div>}
                <h4 className="font-semibold text-text-primary mb-1">{card.title}</h4>
                <p className="text-text-secondary text-sm mb-2">{card.description}</p>
                {card.url && <span className="text-xs text-cyber-cyan break-all">{card.url}</span>}
              </div>
            ))}
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
                <tr key={page.slug || page.id} className="border-t border-dark-border hover:bg-dark-lighter/50">
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

                    {/* Navigation Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                      <label className="flex items-center gap-2 text-sm text-text-secondary bg-dark-card border border-dark-border rounded px-3 py-2">
                        <input
                          type="checkbox"
                          checked={!!editingPage.menu?.includeInNav}
                          onChange={(e) => setEditingPage({
                            ...editingPage,
                            menu: {
                              ...buildMenuConfig(editingPage),
                              includeInNav: e.target.checked,
                            },
                          })}
                          className="accent-cyber-green"
                        />
                        Add to top menu
                      </label>

                      <input
                        type="text"
                        value={editingPage.menu?.label || editingPage.title}
                        onChange={(e) => setEditingPage({
                          ...editingPage,
                          menu: { ...buildMenuConfig(editingPage), label: e.target.value },
                        })}
                        disabled={!editingPage.menu?.includeInNav}
                        className="bg-dark-card border border-dark-border rounded px-3 py-2 text-text-primary text-sm disabled:opacity-50"
                        placeholder="Menu label"
                      />

                      <select
                        value={editingPage.menu?.position || 'end'}
                        onChange={(e) => setEditingPage({
                          ...editingPage,
                          menu: { ...buildMenuConfig(editingPage), position: e.target.value },
                        })}
                        disabled={!editingPage.menu?.includeInNav}
                        className="bg-dark-card border border-dark-border rounded px-3 py-2 text-text-primary text-sm disabled:opacity-50"
                      >
                        <option value="start">At beginning</option>
                        {navigation.map((navItem) => (
                          <option key={navItem.id} value={navItem.id}>{`Before ${navItem.label}`}</option>
                        ))}
                        <option value="end">At end</option>
                      </select>
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
                      <button onClick={() => addBlock('richtext')} className="px-2 py-1 bg-dark-card hover:bg-dark-lighter border border-cyber-purple rounded text-cyber-purple text-xs font-semibold">
                        Rich Text
                      </button>
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
                      <button onClick={() => addBlock('image')} className="px-2 py-1 bg-dark-card hover:bg-dark-lighter border border-dark-border rounded text-text-secondary text-xs">
                        Image
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

      {/* Media Picker Modal */}
      {showMediaPicker && mediaPickerCallback && (
        <MediaPicker
          onSelect={(url) => {
            mediaPickerCallback(url);
            setShowMediaPicker(false);
            setMediaPickerCallback(null);
          }}
          onClose={() => {
            setShowMediaPicker(false);
            setMediaPickerCallback(null);
          }}
          allowedTypes={['image', 'video']}
        />
      )}
    </AdminShell>
  );
}
