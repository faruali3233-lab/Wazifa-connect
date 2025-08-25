
"use client";

import { useEffect, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/header';
import { Skeleton } from '@/components/ui/skeleton';
import { Footer } from '@/components/footer';

export default function JobSeekerLayout({ children }: { children: ReactNode }) {
  const { user, isProfileComplete, seekerProfile } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null) {
      router.replace('/');
      return;
    }
    
    // This layout should not handle recruiter, subAgent or admin roles.
    // They have their own layouts.
    if (user && (user.role === 'recruiter' || user.role === 'subAgent' || user.role === 'admin' || user.role === 'agent')) {
       return;
    }

    // This layout handles jobSeeker and unselected roles for +91 users
    if (user && user.countryCode === '+91') {
      if (user.role === 'unselected' && pathname !== '/job-seeker/home') {
          router.replace('/job-seeker/home');
      } else if (user.role === 'jobSeeker') {
        if (!isProfileComplete && pathname !== '/job-seeker/profile') {
          router.replace('/job-seeker/profile');
        }
      }
    }

  }, [user, isProfileComplete, seekerProfile, router, pathname]);
  
  // If the user role is one handled by another layout, render a loader
  // to prevent flicker while the correct layout takes over.
  if (!user || user.role === 'recruiter' || user.role === 'subAgent' || user.role === 'admin' || user.role === 'agent') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-8"><Skeleton className="h-screen w-full" /></div>
      </div>
    );
  }

  // If profile is not complete, just show the form
  if (user.role === 'jobSeeker' && !isProfileComplete) {
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

  // If on the home page or review page, don't show the dashboard layout
  if (pathname === '/job-seeker/home' || pathname === '/job-seeker/review') {
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

  return <>{children}</>;
}
