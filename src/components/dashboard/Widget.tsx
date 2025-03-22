
import React, { useState } from 'react';
import { MoreHorizontal, Maximize2, Minimize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface WidgetProps {
  title: string;
  className?: string;
  children: React.ReactNode;
  id: string;
}

export function Widget({ title, children, className = '', id }: WidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      id={id}
      className={`widget card-hover transition-all duration-300 ease-in-out ${
        isExpanded ? 'fixed inset-4 z-50 overflow-auto' : 'relative'
      } ${className}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="widget-header">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-md hover:bg-muted/50 transition-colors"
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            <span className="sr-only">{isExpanded ? 'Minimize' : 'Maximize'}</span>
          </button>
          <button className="p-1 rounded-md hover:bg-muted/50 transition-colors">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </button>
        </div>
      </div>
      <div className="widget-body">
        {children}
      </div>
      
      {/* Overlay for expanded state */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-background/50 backdrop-blur-sm z-[-1]"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </motion.div>
  );
}
