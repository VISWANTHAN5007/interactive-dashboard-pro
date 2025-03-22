
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
