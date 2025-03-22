
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart2, Calendar, Settings, MessageSquare, PanelRight, Users, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

type SidebarItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const items: SidebarItem[] = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'Analytics', href: '/analytics', icon: BarChart2 },
  { title: 'Calendar', href: '/calendar', icon: Calendar },
  { title: 'Assistant', href: '/assistant', icon: MessageSquare },
  { title: 'Widgets', href: '/widgets', icon: PanelRight },
  { title: 'Team', href: '/team', icon: Users },
  { title: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Render the sidebar content
  const sidebarContent = (
    <div className="flex flex-col gap-2 p-4">
      {isMobile && (
        <div className="flex justify-end mb-2">
          <button 
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      )}
      {items.map((item, index) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        
        return (
          <Link
            key={index}
            to={item.href}
            className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
              isActive 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
            onClick={isMobile ? onClose : undefined}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
  
  // For mobile: render a slide-in sidebar with backdrop
  if (isMobile) {
    return (
      <>
        {/* Mobile Backdrop */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
        )}
        
        {/* Mobile Sidebar */}
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: isOpen ? 0 : "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed left-0 top-0 z-50 h-screen w-[240px] border-r border-border bg-background pt-16"
        >
          {sidebarContent}
        </motion.aside>
      </>
    );
  }
  
  // For desktop: render the regular sidebar
  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-[240px] border-r border-border bg-background pt-16 hidden md:block">
      {sidebarContent}
    </aside>
  );
}
