
import React, { useState, useRef, useEffect } from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Bot, User, Send, Mic, X, ChevronRight, Loader2 } from 'lucide-react';
import { assistantHistory } from '@/utils/mockData';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionVisible, setSuggestionVisible] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Suggested prompts
  const suggestions = [
    'Show me my task summary',
    'What's my performance this month?',
    'Show me my financial overview',
    'What meetings do I have today?',
    'How am I doing compared to last month?',
  ];
  
  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: '0',
        content: 'Hello! I am your personal assistant. How can I help you today?',
        role: 'assistant',
        timestamp: new Date(),
      },
    ]);
  }, []);
  
  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  // Handle message submission
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim()) return;
    
    // Create user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setSuggestionVisible(false);
    
    // Simulate API delay
    setTimeout(() => {
      const assistantResponse = getAssistantResponse(input);
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: assistantResponse,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1500);
  };
  
  // Simple response generation based on input
  const getAssistantResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('task') || lowerMessage.includes('todo')) {
      return 'You have 6 tasks pending for this week. The highest priority tasks are "Review design proposal" and "Fix bug in login flow". Would you like me to show you the complete list?';
    } else if (lowerMessage.includes('performance') || lowerMessage.includes('metrics')) {
      return 'Your performance this month is at 78%, which is 5% higher than last month. You\'ve completed 18 out of 24 assigned tasks, and your productivity score has been consistently above target.';
    } else if (lowerMessage.includes('financial') || lowerMessage.includes('finance') || lowerMessage.includes('money')) {
      return 'Your financial overview shows $5,200 in income and $3,800 in expenses this month, resulting in $1,400 in savings. Your largest expense categories are Housing ($1,600) and Food ($800).';
    } else if (lowerMessage.includes('meeting') || lowerMessage.includes('calendar') || lowerMessage.includes('schedule')) {
      return 'You have 3 meetings scheduled today:\n• 10:00 AM - Team Meeting (Conference Room A)\n• 2:00 PM - Project Review (Virtual)\n• 4:30 PM - One-on-one with Manager (Office 302)';
    } else if (lowerMessage.includes('compare') || lowerMessage.includes('last month')) {
      return 'Compared to last month, your performance has improved by 5%, task completion rate is up by 8%, and you\'ve reduced expenses by $200. Your productivity peak hours have shifted from afternoon to morning.';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! How can I assist you today? I can help with tasks, schedule, performance insights, or financial overview.';
    } else if (lowerMessage.includes('help') || lowerMessage.includes('can you do')) {
      return 'I can help you with:\n• Summarizing your tasks and deadlines\n• Providing performance metrics and insights\n• Showing financial summaries and trends\n• Managing your calendar and meetings\n• Answering questions about your dashboard data\n\nJust ask me anything you need!';
    } else {
      return 'I\'m analyzing your request. Could you provide more details about what specific information you\'re looking for? I can help with tasks, schedule, performance metrics, or financial summaries.';
    }
  };
  
  // Handle key press (enter to submit, shift+enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  // Use a suggestion
  const useSuggestion = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };
  
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6 animate-slide-up">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Virtual Assistant</h1>
            <p className="text-muted-foreground">Your personal AI assistant for dashboard insights</p>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border border-border overflow-hidden shadow-subtle animate-scale-in">
          <div className="h-[calc(100vh-280px)] min-h-[400px] flex flex-col">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                >
                  <div className="flex gap-3 max-w-[80%]">
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary mt-1">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    
                    <div 
                      className={`p-3 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-tr-none' 
                          : 'bg-muted text-foreground rounded-tl-none'
                      }`}
                    >
                      <div className="whitespace-pre-line">{message.content}</div>
                      <div className={`text-xs mt-1 text-right ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-foreground mt-1">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                    
                    <div className="p-3 rounded-lg bg-muted text-foreground rounded-tl-none">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-foreground/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggestion Chips */}
            {isSuggestionVisible && messages.length <= 3 && (
              <div className="px-4 py-3 border-t border-border animate-slide-up">
                <p className="text-sm text-muted-foreground mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => useSuggestion(suggestion)}
                      className="px-3 py-1.5 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors flex items-center gap-1"
                    >
                      {suggestion}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <button 
                  type="button"
                  className="p-2 rounded-md hover:bg-muted/50 transition-colors text-muted-foreground"
                >
                  <Mic className="h-5 w-5" />
                  <span className="sr-only">Voice input</span>
                </button>
                
                <div className="relative flex-1">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything about your dashboard..."
                    className="w-full py-3 px-4 bg-muted rounded-md resize-none outline-none focus:ring-1 focus:ring-primary pr-10 min-h-[60px] max-h-28"
                    rows={1}
                  ></textarea>
                  
                  {input && (
                    <button 
                      type="button"
                      className="absolute right-10 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-muted/50 transition-colors text-muted-foreground"
                      onClick={() => setInput('')}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Clear input</span>
                    </button>
                  )}
                </div>
                
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-3 rounded-md bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                  <span className="sr-only">Send message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
