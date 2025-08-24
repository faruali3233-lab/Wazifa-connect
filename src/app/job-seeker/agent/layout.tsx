
"use client";

import { useEffect, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
import { LayoutDashboard, Users, UserCheck, Briefcase, HandCoins, MessageSquare, BarChart, Settings, ShieldCheck, FileText, LifeBuoy } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const NavItem = ({ href, icon, children, currentPath }: { href: string; icon: React.ReactNode; children: React.ReactNode; currentPath: string; }) => (
    <SidebarMenuItem>
        <Link href={href} passHref legacyBehavior>
            <SidebarMenuButton isActive={currentPath.startsWith(href)} icon={icon}>
                {children}
            </SidebarMenuButton>
        </Link>
    </SidebarMenuItem>
);

export default function AgentLayout({ children }: { children: ReactNode }) {
  const { user, logout, isProfileComplete, agentProfile } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null) {
      router.replace('/login');
      return;
    }
    
    if (user && user.role !== 'agent') {
        // This layout is only for agents. If a non-agent gets here,
        // other layouts will handle their redirection.
        return;
    }
    
    if (user && user.role === 'agent' && !isProfileComplete) {
        if (pathname !== '/job-seeker/agent/profile') {
            router.replace('/job-seeker/agent/profile');
        }
    }

  }, [user, isProfileComplete, router, pathname]);

  // If the user role isn't set, or is not an agent, show a loader
  // This prevents flicker while the correct layout takes over.
  if (!user || user.role !== 'agent') {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <Skeleton className="h-screen w-screen" />
        </div>
    );
  }

  // Allow profile page to render for new users even if profile is null
  if (!agentProfile && pathname !== '/job-seeker/agent/profile') {
      return (
        <div className="flex items-center justify-center min-h-screen">
            <Skeleton className="h-screen w-screen" />
        </div>
      );
  }
  
  const getPageTitle = () => {
    if (pathname.includes('/dashboard')) return 'Dashboard';
    if (pathname.includes('/profile')) return 'Profile';
    if (pathname.includes('/jobs')) return 'Jobs';
    if (pathname.includes('/candidate-pool')) return 'Candidate Pool';
    if (pathname.includes('/sub-agents')) return 'Sub Agents';
    if (pathname.includes('/pipeline')) return 'Submissions / Pipeline';
    return 'Agent Dashboard';
  }

  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                 <div className="flex items-center gap-2 p-2">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="8" fill="#005430"/>
                        <path d="M10 13C10 11.3431 11.3431 10 13 10H19C20.6569 10 22 11.3431 22 13V22H10V13Z" fill="white"/>
                    </svg>
                    <span className="text-lg font-semibold text-primary">GulfHired Agent</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <NavItem href="/job-seeker/agent/dashboard" icon={<LayoutDashboard />} currentPath={pathname}>Dashboard</NavItem>
                    <NavItem href="/job-seeker/agent/jobs" icon={<Briefcase />} currentPath={pathname}>Jobs</NavItem>
                    <NavItem href="/job-seeker/agent/candidate-pool" icon={<Users />} currentPath={pathname}>Candidate Pool</NavItem>
                    <NavItem href="/job-seeker/agent/sub-agents" icon={<UserCheck />} currentPath={pathname}>Sub Agents</NavItem>
                    <NavItem href="/job-seeker/agent/pipeline" icon={<BarChart />} currentPath={pathname}>Submissions</NavItem>
                    <NavItem href="/job-seeker/agent/messages" icon={<MessageSquare />} currentPath={pathname}>Messages</NavItem>
                    <NavItem href="/job-seeker/agent/payments" icon={<HandCoins />} currentPath={pathname}>Payments</NavItem>
                    <NavItem href="/job-seeker/agent/documents" icon={<FileText />} currentPath={pathname}>Documents & KYC</NavItem>
                    <NavItem href="/job-seeker/agent/settings" icon={<Settings />} currentPath={pathname}>Settings</NavItem>
                    <NavItem href="/job-seeker/agent/help" icon={<LifeBuoy />} currentPath={pathname}>Help / Support</NavItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex items-center gap-3 p-3 border-t">
                    <Avatar>
                        <AvatarImage src={agentProfile?.profilePhotoUrl} />
                        <AvatarFallback>{agentProfile?.name?.charAt(0) || 'A'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="text-sm font-semibold">{agentProfile?.name}</p>
                        <p className="text-xs text-muted-foreground">{agentProfile?.email}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => { logout(); router.push('/'); }}>
                        <LogOut />
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex items-center justify-between p-4 border-b">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">
                   {getPageTitle()}
                </h1>
                <div>{/* Other header content like search, notifications */}</div>
            </header>
            <main className="flex-1 p-6 bg-gray-50/50">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
