
"use client";

import { useEffect, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function AgentRootLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace('/');
      return;
    }
    
    // This layout is only for agents. If not an agent, do nothing and let other layouts handle it.
    if (user && user.role !== 'agent') {
      return; 
    }
    
  }, [user, router]);


  // Show a loading skeleton if auth state is not resolved or if the user is not an agent.
  if (!user || user.role !== 'agent') {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <Skeleton className="h-screen w-screen" />
        </div>
    );
  }
  
  // The dashboard layout is handled by its own layout file.
  // This root layout just passes the children through.
  return <>{children}</>;
}
