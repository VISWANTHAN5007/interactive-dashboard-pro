
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <button 
              className="md:hidden p-2 rounded-md hover:bg-muted/50 transition-colors" 
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </button>
            
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-md bg-primary p-1">
                <span className="block h-6 w-6 text-white font-bold text-center">SD</span>
              </div>
              <span className="font-semibold hidden md:inline-block">Smart Dashboard</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`relative ${isSearchOpen && !isMobile ? 'w-64' : 'w-9'} transition-all duration-300 ease-in-out`}>
              <button 
                className={`absolute right-0 top-0 flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted/50 transition-colors ${isSearchOpen ? 'bg-muted/50' : ''}`}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </button>
              
              <input 
                type="search" 
                placeholder="Search..." 
                className={`h-9 w-full rounded-md bg-muted px-3 py-1 text-sm outline-none focus:ring-1 focus:ring-primary transition-all duration-300 ${isSearchOpen && !isMobile ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              />
            </div>
            
            <button className="relative p-2 rounded-md hover:bg-muted/50 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </button>
            
            <ThemeToggle />
            
            <button className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <span className="text-sm font-medium">JD</span>
              <span className="sr-only">User profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
