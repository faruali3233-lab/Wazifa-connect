"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Briefcase, Users, MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslation } from '@/components/i18n-provider';

export default function RecruiterDashboard() {
  const { user, recruiterProfile, isProfileComplete } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isProfileComplete) {
      router.replace('/recruiter/home');
    }
  }, [isProfileComplete, router]);

  if (!isProfileComplete || !user) {
    return <div className="container mx-auto p-8"><Skeleton className="h-64 w-full" /></div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
             <Avatar className="h-16 w-16">
                <AvatarImage src={recruiterProfile?.profilePhotoUrl} />
                <AvatarFallback>{recruiterProfile?.yourName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t('recruiter_dashboard_title')}</h1>
                <p className="text-muted-foreground">{t('recruiter_dashboard_welcome').replace('{name}', recruiterProfile?.yourName || '').replace('{company}', recruiterProfile?.companyName || '')}</p>
            </div>
        </div>
        <Button onClick={() => router.push('/recruiter/profile')}>
          {t('recruiter_dashboard_edit_profile')}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('recruiter_dashboard_stat_open_roles')}</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">{t('recruiter_dashboard_stat_no_postings')}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('recruiter_dashboard_stat_total_applicants')}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">{t('recruiter_dashboard_stat_no_applicants')}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('recruiter_dashboard_stat_shortlisted')}</CardTitle>
                <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">{t('recruiter_dashboard_stat_pipeline')}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('recruiter_dashboard_stat_messages')}</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">{t('recruiter_dashboard_stat_no_messages')}</p>
            </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('recruiter_dashboard_postings_title')}</CardTitle>
            <CardDescription>{t('recruiter_dashboard_postings_subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">{t('recruiter_dashboard_no_postings')}</p>
            <Button className="mt-4"><PlusCircle className="mr-2 h-4 w-4" />{t('recruiter_dashboard_post_job_button')}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
