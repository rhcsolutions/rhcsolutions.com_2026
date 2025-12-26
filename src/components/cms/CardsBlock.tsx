'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Card {
  title: string;
  description: string;
  icon?: string;
  url?: string;
}

interface CardsBlockProps {
  cards: Card[];
  columns?: number;
  index?: number;
}

export default function CardsBlock({ cards, columns = 3, index = 0 }: CardsBlockProps) {
  const gridClass = columns === 1 ? 'grid-cols-1' : columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index || 0) * 0.1 }}
      className={`grid grid-cols-1 ${gridClass} gap-6`}
    >
      {cards.map((card: Card, i: number) => {
        const CardContent = (
          <motion.div
            className="card-cyber p-6 h-full text-center cursor-pointer transition-all"
            whileHover={{ y: -5 }}
          >
            {card.icon && <div className="text-4xl mb-4">{card.icon}</div>}
            <h3 className="text-xl font-bold text-text-primary mb-3">{card.title}</h3>
            <p className="text-text-secondary">{card.description}</p>
          </motion.div>
        );

        // If card has a URL, wrap it in a Link, otherwise just render the div
        if (card.url) {
          return (
            <Link key={i} href={card.url} className="no-underline">
              {CardContent}
            </Link>
          );
        }

        return (
          <div key={i}>
            {CardContent}
          </div>
        );
      })}
    </motion.div>
  );
}
