'use client';

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean;
  className?: string;
}

export default function QRCodeDisplay({
  value,
  size = 200,
  level = 'H',
  includeMargin = true,
  className = ''
}: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: includeMargin ? 1 : 0,
          errorCorrectionLevel: level,
          color: {
            dark: '#FFFFFF',
            light: '#1a1a2e'
          }
        },
        (error) => {
          if (error) {
            console.error('QR Code generation error:', error);
          }
        }
      );
    }
  }, [value, size, level, includeMargin]);

  return <canvas ref={canvasRef} className={className} />;
}
