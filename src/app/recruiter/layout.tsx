
"use client";

import { type ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Briefcase, Users, MessageSquare, Settings, FileText, BarChart3, UserCircle, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const NavItem = ({ href, icon, children, currentPath }: { href: string; icon: React.ReactNode; children: React.ReactNode; currentPath: string; }) => (
    <SidebarMenuItem>
        <Link href={href}>
            <SidebarMenuButton isActive={currentPath.startsWith(href)} icon={icon}>
                {children}
            </SidebarMenuButton>
        </Link>
    </SidebarMenuItem>
);

const getPageTitle = (pathname: string) => {
    const routeName = pathname.split('/').pop()?.replace(/-/g, ' ') || 'dashboard';
    return routeName.charAt(0).toUpperCase() + routeName.slice(1);
}

export default function RecruiterDashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout, recruiterProfile, isProfileComplete } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null) {
      router.replace('/');
      return;
    }
    
    if (user && user.role !== 'recruiter') {
      // Let other layouts handle non-recruiters.
      return;
    }
    
    if (user && user.role === 'recruiter' && !isProfileComplete) {
        if (pathname !== '/recruiter/welcome' && pathname !== '/recruiter/profile') {
            router.replace('/recruiter/welcome');
        }
    }
  }, [user, isProfileComplete, router, pathname]);

  if (!user || user.role !== 'recruiter') {
      return (
        <div className="flex items-center justify-center min-h-screen">
            <Skeleton className="h-screen w-screen" />
        </div>
      );
  }

  // If profile is not complete and we are on the welcome/profile page, show a simpler layout
  if (!isProfileComplete && (pathname === '/recruiter/welcome' || pathname === '/recruiter/profile')) {
      return (
         <div className="min-h-screen flex flex-col bg-white">
            <header className="p-4 border-b flex justify-end">
                <Button variant="ghost" onClick={() => { logout(); router.push('/'); }}>Logout</Button>
            </header>
            <main className="flex-1 bg-gray-50/50">
                {children}
            </main>
         </div>
      )
  }
  
  const name = recruiterProfile?.yourName || "Recruiter";

  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                 <div className="flex items-center gap-2 p-2">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="8" fill="#005430"/>
                        <path d="M10 13C10 11.3431 11.3431 10 13 10H19C20.6569 10 22 11.3431 22 13V22H10V13Z" fill="white"/>
                    </svg>
                    <span className="text-lg font-semibold text-primary">GulfHired Recruiter</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <NavItem href="/recruiter/dashboard" icon={<LayoutDashboard />} currentPath={pathname}>Dashboard</NavItem>
                    <NavItem href="/recruiter/jobs" icon={<Briefcase />} currentPath={pathname}>Jobs</NavItem>
                    <NavItem href="/recruiter/applications" icon={<Users />} currentPath={pathname}>Applications</NavItem>
                    <NavItem href="/recruiter/messages" icon={<MessageSquare />} currentPath={pathname}>Messages</NavItem>
                    <NavItem href="/recruiter/documents" icon={<FileText />} currentPath={pathname}>Documents</NavItem>
                    <NavItem href="/recruiter/reports" icon={<BarChart3 />} currentPath={pathname}>Reports</NavItem>
                    <NavItem href="/recruiter/settings" icon={<Settings />} currentPath={pathname}>Settings</NavItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex items-center gap-3 p-3 border-t">
                    <Avatar>
                         <AvatarImage src={recruiterProfile?.profilePhotoUrl} />
                        <AvatarFallback>{name.charAt(0) || 'R'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="text-sm font-semibold">{name}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => { logout(); router.push('/'); }}>
                        <LogOut />
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <h1 className="text-xl font-bold">{getPageTitle(pathname)}</h1>
                </div>
                <Button onClick={() => router.push('/recruiter/jobs/new')}>Post a New Job</Button>
            </header>
            <main className="flex-1 p-6 bg-gray-50/50">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
