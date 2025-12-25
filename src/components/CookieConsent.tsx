'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!mounted || !showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 md:p-6 z-50 shadow-lg">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm md:text-base">
            <p>
              We use cookies to enhance your browsing experience and analyze site traffic.
              By clicking "Accept", you consent to our use of cookies.{' '}
              <a href="/privacy-policy" className="underline hover:text-accent">
                Learn more
              </a>
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={declineCookies}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-sm"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 bg-accent hover:bg-accent-dark rounded transition-colors text-sm font-semibold"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
