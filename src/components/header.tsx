
"use client";

import { LogOut, Menu, Languages, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth, type Language } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { useTranslation } from './i18n-provider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link href={href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
    {children}
  </Link>
);

export function Header() {
  const { user, logout, isProfileComplete, language, setLanguage } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
  };
  
  const getHomeLink = () => {
    if(!user) return '/';
    if(user.role === 'recruiter') return '/recruiter/welcome';
    return '/job-seeker/home';
  }

  const handleCompleteProfile = () => {
    const path = user?.role === 'jobSeeker' ? '/job-seeker/profile' : '/recruiter/profile';
    router.push(path);
  };

  const LanguageSwitcher = () => (
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

  const renderJobSeekerNav = () => (
    <>
      <nav className="hidden md:flex gap-4 items-center">
        <LanguageSwitcher />
        <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log out">
          <LogOut className="w-5 h-5" />
        </Button>
      </nav>
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 pt-10">
              <LanguageSwitcher />
              <Button variant="outline" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" /> {t('logout')}</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );

  const renderRecruiterNav = () => (
     <>
      <nav className="hidden md:flex gap-6 items-center">
        <NavLink href="/recruiter/welcome#categories">{t('nav_categories')}</NavLink>
        <NavLink href="/recruiter/welcome#why-choose-us">{t('nav_why')}</NavLink>
        {!isProfileComplete && <Button onClick={handleCompleteProfile} size="sm">{t('cta_completeProfile')}</Button>}
        <LanguageSwitcher />
        <Button variant="ghost" size="icon" onClick={handleLogout} aria-label={t('logout')}>
          <LogOut className="w-5 h-5" />
        </Button>
      </nav>
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 pt-10">
               <NavLink href="/recruiter/welcome#categories">{t('nav_categories')}</NavLink>
               <NavLink href="/recruiter/welcome#why-choose-us">{t('nav_why')}</NavLink>
              {!isProfileComplete && <Button onClick={handleCompleteProfile}>{t('cta_completeProfile')}</Button>}
              <LanguageSwitcher />
              <Button variant="outline" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" /> {t('logout')}</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );

  return (
    <header className="bg-white sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={getHomeLink()} className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#005430"/>
              <path d="M10 13C10 11.3431 11.3431 10 13 10H19C20.6569 10 22 11.3431 22 13V22H10V13Z" fill="white"/>
            </svg>
            <span className="text-xl font-bold" style={{ color: '#005430' }}>GulfHired</span>
          </Link>
          {user?.role === 'recruiter' ? renderRecruiterNav() : renderJobSeekerNav()}
        </div>
      </div>
    </header>
  );
}
