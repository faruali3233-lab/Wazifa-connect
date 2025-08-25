
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
import { LayoutDashboard, Users, ShieldCheck, Briefcase, HandCoins, MessageSquare, BarChart, Settings, ShieldAlert } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const NavItem = ({ href, icon, children, currentPath }: { href: string; icon: React.ReactNode; children: React.ReactNode; currentPath: string; }) => (
    <SidebarMenuItem>
        <Link href={href} passHref legacyBehavior>
            <SidebarMenuButton isActive={currentPath === href} icon={icon}>
                {children}
            </SidebarMenuButton>
        </Link>
    </SidebarMenuItem>
);

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null) {
      router.replace('/login');
    } else if (user && user.role !== 'admin') {
      router.replace('/');
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    // You can render a loading skeleton here
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
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
                    <NavItem href="/admin" icon={<LayoutDashboard />} currentPath={pathname}>Overview</NavItem>
                    <NavItem href="/admin/users" icon={<Users />} currentPath={pathname}>User Management</NavItem>
                    <NavItem href="/admin/kyc" icon={<ShieldCheck />} currentPath={pathname}>KYC & Compliance</NavItem>
                    <NavItem href="/admin/jobs" icon={<Briefcase />} currentPath={pathname}>Jobs & Pipelines</NavItem>
                    <NavItem href="/admin/payments" icon={<HandCoins />} currentPath={pathname}>Payments</NavItem>
                    <NavItem href="/admin/messaging" icon={<MessageSquare />} currentPath={pathname}>Messaging</NavItem>
                    <NavItem href="/admin/reports" icon={<BarChart />} currentPath={pathname}>Reports</NavItem>
                    <NavItem href="/admin/security" icon={<ShieldAlert />} currentPath={pathname}>Audit & Security</NavItem>
                    <NavItem href="/admin/health" icon={<Settings />} currentPath={pathname}>System Health</NavItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex items-center gap-3 p-3 border-t">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="text-sm font-semibold">Admin User</p>
                        <p className="text-xs text-muted-foreground">admin@gulfhired.com</p>
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
                    {pathname.split('/').pop()?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Overview'}
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
