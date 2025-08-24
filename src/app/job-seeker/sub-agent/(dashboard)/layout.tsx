
"use client";

import { type ReactNode } from 'react';
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
import { LayoutDashboard, Users, Briefcase, HandCoins, MessageSquare, BarChart, Settings, FileText, LifeBuoy, CalendarClock, UserSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const NavItem = ({ href, icon, children, currentPath }: { href: string; icon: React.ReactNode; children: React.ReactNode; currentPath: string; }) => (
    <SidebarMenuItem>
        <Link href={href}>
            <SidebarMenuButton isActive={currentPath === href} icon={icon}>
                {children}
            </SidebarMenuButton>
        </Link>
    </SidebarMenuItem>
);

const getPageTitle = (pathname: string) => {
    const routeName = pathname.split('/').pop()?.replace(/-/g, ' ') || 'dashboard';
    if (routeName === 'my profile') return 'My Profile';
    if (routeName === 'help') return 'Help / Support';
    return routeName.replace(/\b\w/g, l => l.toUpperCase());
}

export default function SubAgentDashboardLayout({ children }: { children: ReactNode }) {
  const { logout, subAgentProfile } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (!subAgentProfile) {
      return (
        <div className="flex items-center justify-center min-h-screen">
            <Skeleton className="h-screen w-screen" />
        </div>
      );
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
                    <span className="text-lg font-semibold text-primary">GulfHired Sub-Agent</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <NavItem href="/job-seeker/sub-agent/dashboard" icon={<LayoutDashboard />} currentPath={pathname}>Dashboard</NavItem>
                    <NavItem href="/job-seeker/sub-agent/requirements" icon={<Briefcase />} currentPath={pathname}>Requirements</NavItem>
                    <NavItem href="/job-seeker/sub-agent/candidate-pool" icon={<Users />} currentPath={pathname}>Candidate Pool</NavItem>
                    <NavItem href="/job-seeker/sub-agent/submissions" icon={<BarChart />} currentPath={pathname}>Submissions</NavItem>
                    <NavItem href="/job-seeker/sub-agent/interviews" icon={<CalendarClock />} currentPath={pathname}>Interviews</NavItem>
                    <NavItem href="/job-seeker/sub-agent/messages" icon={<MessageSquare />} currentPath={pathname}>Messages</NavItem>
                    <NavItem href="/job-seeker/sub-agent/payments" icon={<HandCoins />} currentPath={pathname}>Payments</NavItem>
                    <NavItem href="/job-seeker/sub-agent/documents" icon={<FileText />} currentPath={pathname}>Documents</NavItem>
                    <NavItem href="/job-seeker/sub-agent/my-profile" icon={<UserSquare />} currentPath={pathname}>My Profile</NavItem>
                    <NavItem href="/job-seeker/sub-agent/help" icon={<LifeBuoy />} currentPath={pathname}>Help / Support</NavItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex items-center gap-3 p-3 border-t">
                    <Avatar>
                        <AvatarImage src={subAgentProfile?.profilePhotoUrl} />
                        <AvatarFallback>{subAgentProfile?.name?.charAt(0) || 'S'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="text-sm font-semibold">{subAgentProfile?.name}</p>
                        <p className="text-xs text-muted-foreground">{subAgentProfile?.email}</p>
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
                   {getPageTitle(pathname)}
                </h1>
                <div></div>
            </header>
            <main className="flex-1 p-6 bg-gray-50/50">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
