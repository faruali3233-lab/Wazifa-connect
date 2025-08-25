
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  const { user, isProfileComplete } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === 'recruiter') {
        const homePath = isProfileComplete ? '/recruiter' : '/recruiter/welcome';
        router.replace(homePath);
        return;
      }
      
      if (user.role === 'admin') {
        router.replace('/admin/overview');
        return;
      }

      // Handle all other roles (+91 country code users)
      if (user.role === 'unselected') {
         router.replace('/job-seeker/home');
      } else if (isProfileComplete) {
          let dashboardPath = '/job-seeker/dashboard'; // default for jobSeeker
          if (user.role === 'subAgent') {
            dashboardPath = '/job-seeker/sub-agent/dashboard';
          } else if (user.role === 'agent') {
            dashboardPath = '/job-seeker/agent/dashboard';
          } else if (user.role === 'jobSeeker') {
            dashboardPath = '/job-seeker/dashboard';
          }
          router.replace(dashboardPath);
      } else { // Profile is not complete
          let profilePath = '/job-seeker/profile'; // default for jobSeeker
          if (user.role === 'subAgent') {
            profilePath = '/job-seeker/sub-agent/profile';
          } else if (user.role === 'agent') {
            profilePath = '/job-seeker/agent/profile';
          }
          router.replace(profilePath);
      }
    }
  }, [user, isProfileComplete, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="absolute top-8 flex items-center gap-2">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="hsl(var(--primary))"/>
          <path d="M10 13C10 11.3431 11.3431 10 13 10H19C20.6569 10 22 11.3431 22 13V22H10V13Z" fill="white"/>
        </svg>
        <span className="text-2xl font-bold text-primary">GulfHired</span>
      </div>
      <LoginForm />
    </main>
  );
}
