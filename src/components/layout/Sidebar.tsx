
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart2, Calendar, Settings, MessageSquare, PanelRight, Users } from 'lucide-react';

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

export function Sidebar() {
  const location = useLocation();
  
  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-[240px] border-r border-border bg-background pt-16 hidden md:block">
      <div className="flex flex-col gap-2 p-4">
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
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
