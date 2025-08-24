
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
    
    // Redirect recruiters and agents away from this layout
    if (user && (user.role === 'recruiter' || user.role === 'agent')) { 
       if (user.role === 'recruiter') router.replace('/recruiter');
       if (user.role === 'agent') router.replace('/job-seeker/agent/dashboard');
       return;
    }

    // Logic for job seekers & sub-agents
    if (user && user.countryCode === '+91') {
      if (user.role === 'unselected' && pathname !== '/job-seeker/home') {
          router.replace('/job-seeker/home');
      } else if (user.role !== 'unselected' && !isProfileComplete) {
          const profileMap = {
              jobSeeker: 'profile',
              subAgent: 'sub-agent-profile',
              // These roles are handled in other layouts
              agent: '', 
              unselected: 'home',
              admin: '', 
              recruiter: ''
          }
          const rolePath = profileMap[user.role as keyof typeof profileMap];
          if (rolePath) {
            const profilePath = `/job-seeker/${rolePath}`;
            if (pathname !== profilePath) {
                 router.replace(profilePath);
            }
          }
      }
    }

  }, [user, isProfileComplete, router, pathname]);
  
  if (!user || user.role === 'recruiter' || user.role === 'agent') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-8"><Skeleton className="h-screen w-full" /></div>
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
