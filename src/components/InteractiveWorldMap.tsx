'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';

interface Office {
  city: string;
  country: string;
  lat: number;
  lng: number;
  timezone: string;
}

const offices: Office[] = [
  { city: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, timezone: 'EST' },
  { city: 'Lisbon', country: 'Portugal', lat: 38.7223, lng: -9.1393, timezone: 'WET' },
  { city: 'Sofia', country: 'Bulgaria', lat: 42.6977, lng: 23.3219, timezone: 'EET' },
  { city: 'Tel Aviv', country: 'Israel', lat: 32.0853, lng: 34.7818, timezone: 'IST' },
  { city: 'Larnaca', country: 'Cyprus', lat: 34.9124, lng: 33.6332, timezone: 'EET' },
];

export default function InteractiveWorldMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!mapContainer.current) return;
    if (initialized.current) return; // Prevent double initialization

    initialized.current = true;

    (async () => {
      const L = (await import('leaflet')).default;

      // Double-check the container is not already initialized
      if (map.current) {
        map.current.invalidateSize();
        return;
      }

      // Clear any existing map instance in the container
      if (mapContainer.current) {
        mapContainer.current.innerHTML = '';
      }

      // Initialize map centered on Europe
      map.current = L.map(mapContainer.current!, {
        center: [20, 10],
        zoom: 3,
        zoomControl: true,
        scrollWheelZoom: true,
        dragging: true,
      });

      // Use a darker tile provider that matches the theme
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 19,
        opacity: 0.8,
      }).addTo(map.current);

      // Custom icon for office markers
      const customIcon = L.icon({
        iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2300D9FF" width="32" height="32"><path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      // Add markers for each office
      offices.forEach((office) => {
        const marker = L.marker([office.lat, office.lng], {
          icon: customIcon,
        }).addTo(map.current!);

        marker.bindPopup(
          `<div style="color: #fff; font-family: system-ui, -apple-system, sans-serif;">
            <strong style="font-size: 16px; color: #00D9FF;">${office.city}</strong><br/>
            <span style="color: #aaa; font-size: 14px;">${office.country}</span><br/>
            <span style="color: #888; font-size: 12px; font-family: monospace;">${office.timezone}</span>
          </div>`,
          {
            className: 'dark-popup',
            closeButton: true,
          }
        );
      });

      // Draw lines between offices
      offices.forEach((office, idx) => {
        offices.slice(idx + 1).forEach((targetOffice) => {
          L.polyline(
            [[office.lat, office.lng], [targetOffice.lat, targetOffice.lng]],
            {
              color: '#00D9FF',
              weight: 1,
              opacity: 0.3,
              dashArray: '5, 5',
            }
          ).addTo(map.current!);
        });
      });

      // Style popup
      const style = document.createElement('style');
      style.textContent = `
        .dark-popup .leaflet-popup-content-wrapper {
          background-color: #1a1a2e !important;
          border: 1px solid #00D9FF !important;
          border-radius: 8px !important;
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.3) !important;
        }
        .dark-popup .leaflet-popup-tip {
          background-color: #1a1a2e !important;
          border-top-color: #00D9FF !important;
        }
        .dark-popup .leaflet-popup-close-button {
          color: #00D9FF !important;
        }
      `;
      document.head.appendChild(style);
    })();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      initialized.current = false;
    };
  }, []);

  return (
    <section className="section-padding bg-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter to-dark" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            Global <span className="text-gradient">Presence</span>
          </h2>
          <p className="text-text-secondary text-xl max-w-3xl mx-auto">
            With offices across four continents, we provide 24/7 support and local expertise to clients worldwide
          </p>
        </motion.div>

        {/* World Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-6xl mx-auto rounded-2xl border border-dark-border overflow-hidden shadow-2xl"
          style={{ height: '500px' }}
        >
          <div
            ref={mapContainer}
            className="w-full h-full rounded-2xl overflow-hidden"
            style={{
              background: '#0f0f23',
            }}
          />
        </motion.div>

        {/* Office Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {offices.map((office, idx) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              className="card-dark text-center group hover:border-cyber-blue"
            >
              <FaMapMarkerAlt className="text-cyber-blue text-2xl mx-auto mb-3 
                                        group-hover:text-cyber-cyan transition-colors duration-300" />
              <h3 className="text-text-primary font-bold text-lg mb-1">{office.city}</h3>
              <p className="text-text-secondary text-sm">{office.country}</p>
              <p className="text-text-muted text-xs mt-2 font-mono">{office.timezone}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="card-cyber text-center">
            <p className="text-4xl font-bold text-gradient mb-2">5</p>
            <p className="text-text-secondary">Global Offices</p>
          </div>
          <div className="card-cyber text-center">
            <p className="text-4xl font-bold text-gradient mb-2">24/7</p>
            <p className="text-text-secondary">Support Coverage</p>
          </div>
          <div className="card-cyber text-center">
            <p className="text-4xl font-bold text-gradient mb-2">4</p>
            <p className="text-text-secondary">Continents</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
