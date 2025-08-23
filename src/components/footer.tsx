
"use client";

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { useTranslation } from './i18n-provider';

export function Footer() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const isRecruiter = user?.role === 'recruiter';

  const footerText = isRecruiter 
    ? t('footer_recruiter')
    : t('footer_job_seeker');

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">{t('about')}</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">{t('terms')}</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">{t('privacy')}</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">{t('contact')}</Link>
          </div>
          <p className="text-sm text-muted-foreground text-right">
            © 2025 GulfHired. {footerText}
          </p>
        </div>
      </div>
    </footer>
  );
}
