
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Mic, Bot } from 'lucide-react';
import { assistantHistory } from '@/utils/mockData';

interface AssistantDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AssistantDialog({ isOpen, onClose }: AssistantDialogProps) {
  const [messages, setMessages] = useState(assistantHistory);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        message: getAssistantResponse(newMessage),
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  // Simple response logic based on message content
  const getAssistantResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! How can I assist you today?';
    } else if (lowerMessage.includes('task') || lowerMessage.includes('todo')) {
      return 'You have 6 pending tasks. Would you like me to show them to you?';
    } else if (lowerMessage.includes('meeting') || lowerMessage.includes('schedule')) {
      return 'Your next meeting is "Team Meeting" at 10:00 AM. You have 3 more meetings scheduled this week.';
    } else if (lowerMessage.includes('performance') || lowerMessage.includes('productivity')) {
      return 'Your productivity score is 78% this month, which is 5% higher than last month. Great job!';
    } else if (lowerMessage.includes('weather')) {
      return 'It\'s currently 72°F and partly cloudy. The forecast shows sunny weather for tomorrow.';
    } else if (lowerMessage.includes('help')) {
      return 'I can help you with tasks, schedule, performance analytics, and more. Just ask what you need!';
    } else {
      return 'I\'m analyzing your request. Is there something specific you need help with regarding your dashboard, tasks, or schedule?';
    }
  };

  // Handle key press for sending messages
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg h-[80vh] bg-card rounded-lg shadow-lg overflow-hidden animate-scale-in flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-medium">Virtual Assistant</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-md hover:bg-muted/50 transition-colors"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-none' 
                    : 'bg-muted text-foreground rounded-tl-none'
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef}></div>
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-muted/50 transition-colors">
              <Mic className="h-5 w-5" />
              <span className="sr-only">Voice input</span>
            </button>
            
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="w-full py-2 px-3 bg-muted rounded-md resize-none h-10 max-h-32 outline-none focus:ring-1 focus:ring-primary"
                rows={1}
              ></textarea>
            </div>
            
            <button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="p-2 rounded-md bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
