
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
    
    if (user && user.role !== 'agent') {
      // Let other layouts handle non-agents.
      return;
    }
    
    // If the user is an agent but their profile is not complete,
    // and they are NOT on the profile page, redirect them to it.
    if (user && user.role === 'agent' && !isProfileComplete) {
        if (pathname !== '/job-seeker/agent/profile') {
            router.replace('/job-seeker/agent/profile');
        }
    }
  }, [user, isProfileComplete, router, pathname]);

  // Loading state while auth is resolving or if user is not a verified agent
  if (!user || user.role !== 'agent' || (pathname !== '/job-seeker/agent/profile' && !isProfileComplete)) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <Skeleton className="h-screen w-screen" />
        </div>
    );
  }

  // If profile is not complete and we are on the profile page, show just the form without the dashboard layout
  if (!isProfileComplete && pathname === '/job-seeker/agent/profile') {
      return (
         <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1 bg-gray-50/50">
                {children}
            </main>
            <Footer />
         </div>
      )
  }
  
  return <>{children}</>;
}
