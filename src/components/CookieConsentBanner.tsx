"use client";
import React, { useState, useEffect } from 'react';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const consent = localStorage.getItem('aether_cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('aether_cookie_consent', 'accepted');
    setVisible(false);
    // Dynamically load analytics after accept
    import('@/lib/analytics').then(mod => mod.initAnalytics());
  };

  const decline = () => {
    localStorage.setItem('aether_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-lg w-[90%] bg-gray-900 text-gray-100 p-4 rounded-lg shadow-lg border border-gray-700 animate-slide-up">
      <p className="text-sm mb-3">
        We use cookies to analyse traffic and improve your experience. You can
        choose to accept or decline analytics cookies.
      </p>
      <div className="flex justify-end space-x-3 text-sm">
        <button onClick={decline} className="px-3 py-1 rounded border border-gray-600 hover:bg-gray-700">
          Decline
        </button>
        <button onClick={accept} className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white">
          Accept
        </button>
      </div>
    </div>
  );
} 