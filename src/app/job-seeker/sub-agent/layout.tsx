
"use client";

import { useEffect, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';

export default function SubAgentRootLayout({ children }: { children: ReactNode }) {
  const { user, isProfileComplete } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null) {
      router.replace('/login');
      return;
    }
    
    if (user && user.role !== 'subAgent') {
      // Let other layouts handle non-sub-agents.
      return;
    }
    
    // If the user is a sub-agent but their profile is not complete,
    // and they are NOT on the profile page, redirect them to it.
    if (user && user.role === 'subAgent' && !isProfileComplete) {
        if (pathname !== '/job-seeker/sub-agent/profile') {
            router.replace('/job-seeker/sub-agent/profile');
        }
    }
  }, [user, isProfileComplete, router, pathname]);

  // Loading state while auth is resolving or if user is not a verified sub-agent
  if (!user || user.role !== 'subAgent' || (pathname !== '/job-seeker/sub-agent/profile' && !isProfileComplete)) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <Skeleton className="h-screen w-screen" />
        </div>
    );
  }

  // If profile is not complete and we are on the profile page, show just the form without the dashboard layout
  if (!isProfileComplete && pathname === '/job-seeker/sub-agent/profile') {
      return (
         <div className="min-h-screen flex flex-col bg-white">
            <main className="flex-1 bg-gray-50/50">
                {children}
            </main>
         </div>
      )
  }
  
  return <>{children}</>;
}
