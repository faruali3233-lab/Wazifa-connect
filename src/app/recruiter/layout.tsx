
"use client";

import { type ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, type Language } from '@/hooks/use-auth';
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
import { LayoutDashboard, Briefcase, Users, MessageSquare, Settings, FileText, BarChart3, UserCircle, LogOut, Globe } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/components/i18n-provider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const NavItem = ({ href, icon, children, currentPath, exact = false }: { href: string; icon: React.ReactNode; children: React.ReactNode; currentPath: string; exact?: boolean; }) => {
    const isActive = exact ? currentPath === href : currentPath.startsWith(href);
    return (
        <SidebarMenuItem>
            <Link href={href}>
                <SidebarMenuButton isActive={isActive} icon={icon}>
                    {children}
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
    )
};

const getPageTitle = (pathname: string, t: (key: any) => string) => {
    if (pathname === '/recruiter') return t('recruiter_dashboard_title' as any);
    const routeName = pathname.split('/').pop()?.replace(/-/g, ' ') || 'dashboard';
    if (routeName === 'new') return t('recruiter_jobs_new_title' as any);
    if (routeName === 'dashboard') return t('recruiter_dashboard_title' as any);
    if (routeName === 'jobs') return t('recruiter_jobs_title' as any);
    if (routeName === 'applications') return t('recruiter_applications_title' as any);
    if (routeName === 'messages') return t('recruiter_messages_title' as any);
    if (routeName === 'documents') return t('recruiter_documents_title' as any);
    if (routeName === 'reports') return t('recruiter_reports_title' as any);
    if (routeName === 'settings') return t('recruiter_settings_title' as any);
    return routeName.charAt(0).toUpperCase() + routeName.slice(1);
}

const LanguageSwitcher = () => {
    const { t } = useTranslation();
    const { setLanguage } = useAuth();
    
    const handleLanguageChange = (newLang: Language) => {
        setLanguage(newLang);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={t('lang_label')}>
                    <Globe className="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>English (EN)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('hi')}>हिंदी (HI)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('ar')}>العربية (AR)</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default function RecruiterDashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout, recruiterProfile, isProfileComplete } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

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
            <header className="p-4 border-b flex justify-end items-center gap-4">
                <LanguageSwitcher />
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
                    <span className="text-lg font-semibold text-primary">{t('recruiter_dashboard_title' as any)}</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <NavItem href="/recruiter" icon={<LayoutDashboard />} currentPath={pathname} exact={true}>{t('recruiter_dashboard_nav_dashboard' as any)}</NavItem>
                    <NavItem href="/recruiter/jobs" icon={<Briefcase />} currentPath={pathname}>{t('recruiter_dashboard_nav_jobs' as any)}</NavItem>
                    <NavItem href="/recruiter/applications" icon={<Users />} currentPath={pathname}>{t('recruiter_dashboard_nav_applications' as any)}</NavItem>
                    <NavItem href="/recruiter/messages" icon={<MessageSquare />} currentPath={pathname}>{t('recruiter_dashboard_nav_messages' as any)}</NavItem>
                    <NavItem href="/recruiter/documents" icon={<FileText />} currentPath={pathname}>{t('recruiter_dashboard_nav_documents' as any)}</NavItem>
                    <NavItem href="/recruiter/reports" icon={<BarChart3 />} currentPath={pathname}>{t('recruiter_dashboard_nav_reports' as any)}</NavItem>
                    <NavItem href="/recruiter/settings" icon={<Settings />} currentPath={pathname}>{t('recruiter_dashboard_nav_settings' as any)}</NavItem>
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
                    <h1 className="text-xl font-bold">{getPageTitle(pathname, t)}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <Button onClick={() => router.push('/recruiter/jobs/new')}>{t('recruiter_dashboard_post_job_button' as any)}</Button>
                </div>
            </header>
            <main className="flex-1 p-6 bg-gray-50/50">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
