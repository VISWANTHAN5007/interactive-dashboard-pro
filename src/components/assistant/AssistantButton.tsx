
import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { AssistantDialog } from './AssistantDialog';

export function AssistantButton() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-transform hover:scale-105 animate-float"
        aria-label="Open Virtual Assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
      
      <AssistantDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
