
import React, { useState, useEffect } from 'react';
import { Widget } from './Widget';

interface WidgetGridProps {
  children: React.ReactNode;
}

export function WidgetGrid({ children }: WidgetGridProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) return null;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {React.Children.map(children, (child, index) => (
        <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
          {child}
        </div>
      ))}
    </div>
  );
}
