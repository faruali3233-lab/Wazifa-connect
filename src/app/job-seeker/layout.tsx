
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
    
    // This layout should not handle admin or recruiter roles.
    // They have their own layouts.
    if (user && (user.role === 'recruiter' || user.role === 'admin')) {
       return;
    }

    // This layout handles jobSeeker, subAgent, and unselected roles for +91 users
    if (user && user.countryCode === '+91') {
      if (user.role === 'unselected' && pathname !== '/job-seeker/home') {
          router.replace('/job-seeker/home');
      } else if (user.role !== 'unselected' && !isProfileComplete) {
          const profileMap = {
              jobSeeker: '/job-seeker/profile',
              subAgent: '/job-seeker/sub-agent-profile',
          };
          const rolePath = profileMap[user.role as keyof typeof profileMap];
          if (rolePath && pathname !== rolePath) {
            router.replace(rolePath);
          }
      }
    }

  }, [user, isProfileComplete, router, pathname]);
  
  // If the user role is one handled by another layout, render a loader
  // to prevent flicker while the correct layout takes over.
  if (!user || user.role === 'recruiter' || user.role === 'admin') {
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
