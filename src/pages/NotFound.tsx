
import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { PageTransition } from '@/components/layout/PageTransition';
import { HomeIcon, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center p-4">
        <div className="mb-6 w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center">
          <span className="text-5xl font-light">404</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-2 text-center">Page Not Found</h1>
        <p className="text-muted-foreground text-center mb-8 max-w-md">
          We couldn't find the page you're looking for. The URL <span className="font-mono bg-muted px-1 py-0.5 rounded text-sm">{location.pathname}</span> doesn't exist.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <HomeIcon className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
