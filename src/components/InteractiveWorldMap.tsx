'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';

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

  useEffect(() => {
    if (!mapContainer.current) return;

    // Dynamically load Leaflet CSS and JS
    if (!window.L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      const L = window.L;
      
      if (map.current) {
        map.current.remove();
      }

      // Initialize map centered on Europe
      map.current = L.map(mapContainer.current, {
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
        }).addTo(map.current);

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
      const bounds = L.latLngBounds(
        offices.map(office => [office.lat, office.lng])
      );
      
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
          ).addTo(map.current);
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
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
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

export default function InteractiveWorldMap() {
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
          className="relative w-full aspect-[2/1] max-w-6xl mx-auto bg-dark-card rounded-2xl border border-dark-border overflow-hidden p-8"
        >
          {/* World Map Background - Enhanced with continents */}
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 2000 1000" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ff00" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#00ffff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00ff00" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              
              {/* North America */}
              <path
                d="M 200,200 L 250,150 L 300,140 L 350,150 L 400,170 L 450,180 L 480,220 L 500,260 L 480,300 L 450,330 L 400,350 L 350,360 L 300,350 L 250,330 L 220,290 L 200,250 Z"
                fill="url(#mapGradient)"
                stroke="#00ff00"
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDuration: '4s' }}
              />
              
              {/* South America */}
              <path
                d="M 400,450 L 430,420 L 460,430 L 480,460 L 490,500 L 480,550 L 460,600 L 440,640 L 410,660 L 380,650 L 360,620 L 350,580 L 360,540 L 380,500 L 390,470 Z"
                fill="url(#mapGradient)"
                stroke="#00ffff"
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDuration: '5s' }}
              />
              
              {/* Europe */}
              <path
                d="M 900,180 L 950,160 L 1000,170 L 1030,190 L 1050,220 L 1040,250 L 1020,270 L 980,280 L 940,270 L 910,240 L 900,210 Z"
                fill="url(#mapGradient)"
                stroke="#00ff00"
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDuration: '4.5s' }}
              />
              
              {/* Africa */}
              <path
                d="M 950,300 L 1000,290 L 1050,310 L 1080,340 L 1100,380 L 1110,430 L 1100,480 L 1080,530 L 1050,560 L 1000,570 L 950,560 L 920,530 L 900,480 L 910,430 L 930,380 L 940,340 Z"
                fill="url(#mapGradient)"
                stroke="#00ffff"
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDuration: '5.5s' }}
              />
              
              {/* Asia */}
              <path
                d="M 1100,150 L 1200,140 L 1300,150 L 1400,170 L 1500,190 L 1550,220 L 1570,260 L 1560,300 L 1530,340 L 1480,360 L 1420,370 L 1360,360 L 1300,340 L 1250,310 L 1200,280 L 1150,250 L 1110,210 L 1100,180 Z"
                fill="url(#mapGradient)"
                stroke="#00ff00"
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDuration: '6s' }}
              />
              
              {/* Australia */}
              <path
                d="M 1450,600 L 1520,590 L 1570,610 L 1600,640 L 1590,680 L 1560,710 L 1510,720 L 1460,710 L 1430,680 L 1430,640 Z"
                fill="url(#mapGradient)"
                stroke="#00ffff"
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDuration: '4.8s' }}
              />
              
              {/* Grid lines for atmosphere */}
              <line x1="0" y1="250" x2="2000" y2="250" stroke="#00ff00" strokeWidth="1" opacity="0.2" strokeDasharray="10,10" />
              <line x1="0" y1="500" x2="2000" y2="500" stroke="#00ffff" strokeWidth="1" opacity="0.2" strokeDasharray="10,10" />
              <line x1="0" y1="750" x2="2000" y2="750" stroke="#00ff00" strokeWidth="1" opacity="0.2" strokeDasharray="10,10" />
              
              <line x1="500" y1="0" x2="500" y2="1000" stroke="#00ff00" strokeWidth="1" opacity="0.2" strokeDasharray="10,10" />
              <line x1="1000" y1="0" x2="1000" y2="1000" stroke="#00ffff" strokeWidth="1" opacity="0.2" strokeDasharray="10,10" />
              <line x1="1500" y1="0" x2="1500" y2="1000" stroke="#00ff00" strokeWidth="1" opacity="0.2" strokeDasharray="10,10" />
            </svg>
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#00D9FF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {offices.map((office, idx) => (
              <g key={office.city}>
                {offices.slice(idx + 1).map((targetOffice) => (
                  <motion.line
                    key={`${office.city}-${targetOffice.city}`}
                    x1={`${office.coordinates.x}%`}
                    y1={`${office.coordinates.y}%`}
                    x2={`${targetOffice.coordinates.x}%`}
                    y2={`${targetOffice.coordinates.y}%`}
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: idx * 0.2 }}
                  />
                ))}
              </g>
            ))}
          </svg>

          {/* Office Markers */}
          {offices.map((office, idx) => (
            <motion.div
              key={office.city}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: 'spring',
                stiffness: 200,
                delay: 0.5 + idx * 0.1 
              }}
              className="absolute group cursor-pointer"
              style={{
                left: `${office.coordinates.x}%`,
                top: `${office.coordinates.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Pulse Effect */}
              <motion.div
                className="absolute inset-0 bg-cyber-blue rounded-full"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Marker */}
              <div className="relative z-10">
                <FaMapMarkerAlt className="text-cyber-blue text-3xl drop-shadow-[0_0_10px_rgba(0,217,255,0.8)] 
                                          group-hover:text-cyber-cyan transition-colors duration-300" />
              </div>

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-none"
              >
                <div className="bg-dark-card border-2 border-cyber-blue rounded-lg px-4 py-2 whitespace-nowrap
                              shadow-[0_0_20px_rgba(0,217,255,0.3)]">
                  <p className="text-text-primary font-bold text-sm">{office.city}</p>
                  <p className="text-text-secondary text-xs">{office.country} · {office.timezone}</p>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-cyber-blue" />
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Animated Grid Lines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 opacity-5" 
                 style={{
                   backgroundImage: `
                     linear-gradient(to right, rgba(0, 217, 255, 0.3) 1px, transparent 1px),
                     linear-gradient(to bottom, rgba(0, 217, 255, 0.3) 1px, transparent 1px)
                   `,
                   backgroundSize: '50px 50px',
                 }}
            />
          </div>
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
