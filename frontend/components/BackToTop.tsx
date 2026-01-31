'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const SCROLL_THRESHOLD = 400;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition-all"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
