'use client';

import { useEffect, useState } from 'react';

export default function AnimatedSection({ children, className }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'} ${className}`}>
      {children}
    </div>
  );
}