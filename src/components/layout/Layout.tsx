
import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';
import { AssistantButton } from '@/components/assistant/AssistantButton';
import { motion, AnimatePresence } from 'framer-motion';

export function Layout() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Add a slight delay to make the animation more noticeable
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <AnimatePresence>
          {isLoaded && (
            <motion.main 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 md:pl-[240px] pt-16"
            >
              <div className="container mx-auto px-4 py-6">
                <Outlet />
              </div>
            </motion.main>
          )}
        </AnimatePresence>
      </div>
      <AssistantButton />
    </div>
  );
}
