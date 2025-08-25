
"use client";

import { useEffect, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function AgentRootLayout({ children }: { children: ReactNode }) {
  const { user, isProfileComplete } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null) {
      router.replace('/');
      return;
    }
    
    // This layout is only for agents. If not an agent, do nothing and let other layouts handle it.
    if (user && user.role !== 'agent') {
      return; 
    }
    
    // If user is an agent but profile is incomplete, redirect them to the profile page
    // if they aren't already there.
    if (user.role === 'agent' && !isProfileComplete && pathname !== '/job-seeker/agent/profile') {
        router.replace('/job-seeker/agent/profile');
    }
  }, [user, isProfileComplete, router, pathname]);


  // Show a loading skeleton if auth state is not resolved or if the user is not an agent.
  if (!user || user.role !== 'agent') {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <Skeleton className="h-screen w-screen" />
        </div>
    );
  }

  // If the profile is incomplete, we are on the profile page.
  // Show the form with a simple header/footer, not the full dashboard layout.
  if (!isProfileComplete && pathname === '/job-seeker/agent/profile') {
      return (
         <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1 bg-gray-50/50">
                {children}
            </main>
            <Footer />
         </div>
      );
  }
  
  // If profile is complete, the dashboard layout is handled by its own layout file.
  // This root layout just passes the children through.
  return <>{children}</>;
}
