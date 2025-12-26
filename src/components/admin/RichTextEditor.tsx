'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { 
  FaBold, FaItalic, FaUnderline, FaStrikethrough, FaCode, FaListUl, 
  FaListOl, FaQuoteLeft, FaUndo, FaRedo, FaLink, FaImage,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify
} from 'react-icons/fa';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({ 
  content, 
  onChange, 
  placeholder = 'Start typing...',
  minHeight = '200px'
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-cyber-cyan hover:text-cyber-green underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none px-4 py-3 text-text-primary',
        style: `min-height: ${minHeight}`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border border-dark-border rounded-lg overflow-hidden bg-dark-card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-dark-border bg-dark-lighter">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 pr-2 border-r border-dark-border">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-dark-card transition-colors ${
              editor.isActive('bold') ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-secondary'
            }`}
            title="Bold"
          >
            <FaBold />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-dark-card transition-colors ${
              editor.isActive('italic') ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-secondary'
            }`}
            title="Italic"
          >
            <FaItalic />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-dark-card transition-colors ${
              editor.isActive('underline') ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-secondary'
            }`}
            title="Underline"
          >
            <FaUnderline />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-dark-card transition-colors ${
              editor.isActive('strike') ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-secondary'
            }`}
            title="Strikethrough"
          >
            <FaStrikethrough />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-2 rounded hover:bg-dark-card transition-colors ${
              editor.isActive('code') ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-secondary'
            }`}
            title="Inline Code"
          >
            <FaCode />
          </button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 pr-2 border-r border-dark-border">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-2 py-1 rounded text-sm font-semibold hover:bg-dark-card transition-colors ${
              editor.isActive('heading', { level: 1 }) ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-secondary'
            }`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 py-1 rounded text-sm font-semibold hover:bg-dark-card transition-colors ${
              editor.isActive('heading', { level: 2 }) ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-secondary'
            }`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-2 py-1 rounded text-sm font-semibold hover:bg-dark-card transition-colors ${
              editor.isActive('heading', { level: 3 }) ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-secondary'
            }`}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 pr-2 border-r border-dark-border">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-dark-card transition-colors ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-secondary'
            }`}
            title="Align Left"
          >
            <FaAlignLeft />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded hover:bg-dark-card transition-colors ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-secondary'
            }`}
            title="Align Center"
          >
            <FaAlignCenter />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded hover:bg-dark-card transition-colors ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-secondary'
            }`}
            title="Align Right"
          >
            <FaAlignRight />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-2 rounded hover:bg-dark-card transition-colors ${
              editor.isActive({ textAlign: 'justify' }) ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-secondary'
            }`}
            title="Justify"
          >
            <FaAlignJustify />
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 pr-2 border-r border-dark-border">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-dark-card transition-colors ${
              editor.isActive('bulletList') ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-secondary'
            }`}
            title="Bullet List"
          >
            <FaListUl />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-dark-card transition-colors ${
              editor.isActive('orderedList') ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-secondary'
            }`}
            title="Numbered List"
          >
            <FaListOl />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-dark-card transition-colors ${
              editor.isActive('blockquote') ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-secondary'
            }`}
            title="Blockquote"
          >
            <FaQuoteLeft />
          </button>
        </div>

        {/* Links & Media */}
        <div className="flex items-center gap-1 pr-2 border-r border-dark-border">
          <button
            type="button"
            onClick={addLink}
            className={`p-2 rounded hover:bg-dark-card transition-colors ${
              editor.isActive('link') ? 'bg-cyber-green/20 text-cyber-green' : 'text-text-secondary'
            }`}
            title="Add Link"
          >
            <FaLink />
          </button>
          <button
            type="button"
            onClick={addImage}
            className="p-2 rounded hover:bg-dark-card transition-colors text-text-secondary"
            title="Add Image"
          >
            <FaImage />
          </button>
        </div>

        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 rounded hover:bg-dark-card transition-colors text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed"
            title="Undo"
          >
            <FaUndo />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 rounded hover:bg-dark-card transition-colors text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed"
            title="Redo"
          >
            <FaRedo />
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
