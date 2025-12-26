'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

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

interface DynamicPageRendererProps {
  blocks: ContentBlock[];
}

export default function DynamicPageRenderer({ blocks }: DynamicPageRendererProps) {
  const getAlignClass = (align?: string) => {
    switch (align) {
      case 'center':
        return 'text-center mx-auto';
      case 'right':
        return 'text-right ml-auto';
      default:
        return 'text-left';
    }
  };

  const renderBlock = (block: ContentBlock, index: number) => {
    const alignClass = getAlignClass(block.styles?.align);

    switch (block.type) {
      case 'richtext':
        return (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`prose prose-invert max-w-none ${alignClass}`}
            dangerouslySetInnerHTML={{ __html: block.content || '' }}
          />
        );

      case 'hero':
        return (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`py-20 px-8 bg-gradient-cyber rounded-xl ${alignClass}`}
          >
            <h1 className="heading-xl text-gradient mb-6">{block.content.title}</h1>
            <p className="text-xl text-text-secondary mb-8">{block.content.subtitle}</p>
            {block.content.cta && (
              <Link href={block.content.cta.url} className="btn-primary">
                {block.content.cta.text}
              </Link>
            )}
          </motion.div>
        );

      case 'heading':
        const level = block.styles?.level || 2;
        const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
        const headingClass = 
          level === 1 ? 'heading-xl' :
          level === 2 ? 'heading-lg' :
          level === 3 ? 'heading-md' : 'heading-sm';
        
        return (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={alignClass}
          >
            <HeadingTag className={`${headingClass} text-gradient`}>
              {block.content}
            </HeadingTag>
          </motion.div>
        );

      case 'paragraph':
        return (
          <motion.p
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`text-lg text-text-secondary ${alignClass}`}
          >
            {block.content}
          </motion.p>
        );

      case 'button':
        return (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={alignClass}
          >
            <Link href={block.content.url} className="btn-primary">
              {block.content.text}
            </Link>
          </motion.div>
        );

      case 'image':
        return (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={alignClass}
          >
            <img 
              src={block.content} 
              alt="Content image" 
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </motion.div>
        );

      case 'list':
        const items = block.content.split('\n').filter((item: string) => item.trim());
        return (
          <motion.ul
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`list-disc list-inside text-text-secondary space-y-2 ${alignClass}`}
          >
            {items.map((item: string, i: number) => (
              <li key={i}>{item.replace(/^[•\-*]\s*/, '')}</li>
            ))}
          </motion.ul>
        );

      case 'testimonial':
        return (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="card-cyber p-8 border-l-4 border-cyber-cyan"
          >
            <div className="text-4xl text-cyber-cyan/30 mb-4">"</div>
            <p className="text-xl text-text-primary italic mb-6">{block.content.quote}</p>
            <div className="text-text-secondary">
              <p className="font-semibold text-text-primary">{block.content.author}</p>
              <p className="text-sm">{block.content.role}</p>
            </div>
          </motion.div>
        );

      case 'cards':
        const columns = block.styles?.columns || 3;
        return (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}
          >
            {block.content.cards.map((card: any, i: number) => (
              <motion.div
                key={i}
                className="card-cyber p-6 text-center"
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{card.title}</h3>
                <p className="text-text-secondary">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>
        );

      case 'columns':
        const colCount = block.styles?.columns || 2;
        return (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`grid grid-cols-1 md:grid-cols-${colCount} gap-8`}
          >
            {block.content.columns.map((col: any, i: number) => (
              <div key={i} className="text-text-secondary">
                {col.content}
              </div>
            ))}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-12">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}
