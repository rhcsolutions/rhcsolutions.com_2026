import { useEffect } from 'react';

export function useTheme() {
  useEffect(() => {
    // Fetch theme on client mount and apply CSS variables
    const fetchAndApplyTheme = async () => {
      try {
        const res = await fetch('/api/cms/theme', { credentials: 'include' });
        if (!res.ok) return;
        const theme = await res.json();
        
        // Apply fonts and sizes as CSS variables to document root
        const root = document.documentElement;
        root.style.setProperty('--font-primary-family', theme.fonts?.primary || 'Inter, system-ui, sans-serif');
        root.style.setProperty('--font-secondary-family', theme.fonts?.secondary || 'Space Grotesk, system-ui, sans-serif');
        root.style.setProperty('--font-mono-family', theme.fonts?.mono || 'JetBrains Mono, Courier New, monospace');
        root.style.setProperty('--font-primary-size', theme.fontSizes?.primary || '16px');
        root.style.setProperty('--font-secondary-size', theme.fontSizes?.secondary || '16px');
        root.style.setProperty('--font-mono-size', theme.fontSizes?.mono || '14px');
        
        // Update type scale based on primary font size
        const primaryPx = parseFloat(theme.fontSizes?.primary || '16px');
        const scale = isNaN(primaryPx) ? 1 : primaryPx / 16;
        root.style.setProperty('--type-scale', String(scale));
      } catch (error) {
        console.error('[useTheme] Failed to fetch theme:', error);
      }
    };
    
    fetchAndApplyTheme();
  }, []);
}
