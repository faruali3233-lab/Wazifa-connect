"use client";

import { LogOut, Briefcase, Building } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };
  
  const getHomeLink = () => {
    if(!user) return '/';
    return user.role === 'jobSeeker' ? '/job-seeker/home' : '/recruiter/home';
  }

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={getHomeLink()} className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="hsl(var(--primary))"/>
              <path d="M10 13C10 11.3431 11.3431 10 13 10H19C20.6569 10 22 11.3431 22 13V22H10V13Z" fill="white"/>
            </svg>
            <span className="text-xl font-bold text-primary">GulfHired</span>
          </Link>
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {user.role === 'jobSeeker' ? <Briefcase className="w-4 h-4" /> : <Building className="w-4 h-4" />}
                <span>{user.role === 'jobSeeker' ? 'Job Seeker' : 'Recruiter'}</span>
              </div>
            )}
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log out">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
