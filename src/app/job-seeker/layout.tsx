"use client";

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/header';
import { Skeleton } from '@/components/ui/skeleton';

export default function JobSeekerLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace('/');
    } else if (user && user.role !== 'jobSeeker') {
      router.replace('/recruiter/home');
    }
  }, [user, router]);
  
  if (!user || user.role !== 'jobSeeker') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-8"><Skeleton className="h-24 w-full" /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
