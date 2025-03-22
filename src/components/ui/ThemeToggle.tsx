
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-muted/50 transition-colors"
      title={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${resolvedTheme === 'dark' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} absolute`} />
      <Moon className={`h-[1.2rem] w-[1.2rem] transition-all ${resolvedTheme === 'dark' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} absolute`} />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
