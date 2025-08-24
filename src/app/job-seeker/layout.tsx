
"use client";

import { useEffect, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/header';
import { Skeleton } from '@/components/ui/skeleton';
import { Footer } from '@/components/footer';

export default function JobSeekerLayout({ children }: { children: ReactNode }) {
  const { user, isProfileComplete } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null) {
      router.replace('/');
      return;
    }
    
    // Redirect recruiters away from job seeker section
    if (user && user.role === 'recruiter') { 
       router.replace('/recruiter/welcome');
       return;
    }

    // Logic for job seekers, agents, sub-agents
    if (user && user.countryCode === '+91') {
      if (user.role === 'unselected' && pathname !== '/job-seeker/home') {
          router.replace('/job-seeker/home');
      } else if (user.role !== 'unselected' && !isProfileComplete) {
          const profilePath = `/job-seeker/${user.role}-profile`;
          if (pathname !== profilePath) {
               router.replace(profilePath);
          }
      }
    }

  }, [user, isProfileComplete, router, pathname]);
  
  // Simplified check for initial loading state
  if (!user || user.role === 'recruiter') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-8"><Skeleton className="h-24 w-full" /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
