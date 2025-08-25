
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
import { 
    LayoutDashboard, 
    Users, 
    ShieldCheck, 
    Briefcase, 
    Workflow, 
    HandCoins, 
    MessageSquare, 
    BarChart3,
    HeartPulse,
    DatabaseZap,
    Settings,
    UserCircle,
    Search,
    Bell,
    PlusCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

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
    const routeName = pathname.split('/').pop()?.replace(/-/g, ' ') || 'overview';
    if (routeName === 'kyc') return 'KYC & Compliance';
    if (routeName === 'system-health') return 'System Health';
    if (routeName === 'audit-security') return 'Audit & Security';
    return routeName.charAt(0).toUpperCase() + routeName.slice(1);
}

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

   useEffect(() => {
    if (user === null) {
      router.replace('/');
      return;
    }
    
    if (user && user.role !== 'admin') {
      router.replace('/');
    }
  }, [user, router]);


  if (!user || user.role !== 'admin') {
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
                    <span className="text-lg font-semibold text-primary">GulfHired Admin</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <NavItem href="/admin/overview" icon={<LayoutDashboard />} currentPath={pathname}>Overview</NavItem>
                    <NavItem href="/admin/users" icon={<Users />} currentPath={pathname}>Users</NavItem>
                    <NavItem href="/admin/kyc" icon={<ShieldCheck />} currentPath={pathname}>KYC</NavItem>
                    <NavItem href="/admin/jobs" icon={<Briefcase />} currentPath={pathname}>Jobs</NavItem>
                    <NavItem href="/admin/pipelines" icon={<Workflow />} currentPath={pathname}>Pipelines</NavItem>
                    <NavItem href="/admin/payments" icon={<HandCoins />} currentPath={pathname}>Payments</NavItem>
                    <NavItem href="/admin/messaging" icon={<MessageSquare />} currentPath={pathname}>Messaging</NavItem>
                    <NavItem href="/admin/reports" icon={<BarChart3 />} currentPath={pathname}>Reports</NavItem>
                    <NavItem href="/admin/system-health" icon={<HeartPulse />} currentPath={pathname}>System Health</NavItem>
                    <NavItem href="/admin/audit-security" icon={<DatabaseZap />} currentPath={pathname}>Audit/Security</NavItem>
                    <NavItem href="/admin/settings" icon={<Settings />} currentPath={pathname}>Settings</NavItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex items-center gap-3 p-3 border-t">
                    <Avatar>
                        <AvatarFallback><UserCircle /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="text-sm font-semibold">Admin User</p>
                        <p className="text-xs text-muted-foreground">Super Admin</p>
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
                    <div className="relative hidden md:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search..." className="pl-8" />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                     <Button variant="outline" size="sm">Today</Button>
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                     <Button variant="ghost" size="icon">
                        <PlusCircle className="h-5 w-5" />
                        <span className="sr-only">Quick Actions</span>
                    </Button>
                </div>
            </header>
            <main className="flex-1 p-6 bg-gray-50/50">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
