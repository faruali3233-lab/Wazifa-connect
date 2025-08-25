
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Briefcase, Users, MessageSquare, AlertCircle, FileCheck, FileClock, Inbox } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useTranslation } from '@/components/i18n-provider';

const KpiCard = ({ title, value, icon, href, router }: { title: string, value: string | number, icon: React.ReactNode, href: string, router: any }) => (
  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push(href)}>
    <CardHeader className="flex flex-row items-center justify-between pb-2 text-right rtl:text-left">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent className="text-right rtl:text-left">
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const mockJobs = [
    { title: 'Heavy Duty Driver', title_ar: 'سائق شاحنة ثقيلة', applied: 12, shortlisted: 4, selected: 1 },
    { title: 'Construction Painter', title_ar: 'دهان بناء', applied: 8, shortlisted: 2, selected: 0 },
    { title: 'Household Cook', title_ar: 'طباخ منزلي', applied: 23, shortlisted: 8, selected: 2 },
];

const mockActionItems = [
    { title: "Review New Applications", title_ar: "مراجعة الطلبات الجديدة", description: "5 new candidates are waiting for your review.", description_ar: "5 مرشحين جدد في انتظار مراجعتك.", cta: "Review Now", cta_ar: "مراجعة الآن", href: "/recruiter/applications?stage=applied&when=today", icon: <Users />},
    { title: "Upload Wakala", title_ar: "تحميل وكالة", description: "3 candidates are waiting for their Wakala.", description_ar: "3 مرشحين ينتظرون وكالتهم.", cta: "Upload Documents", cta_ar: "تحميل المستندات", href: "/recruiter/applications?stage=wakala&needs=upload", icon: <FileClock /> },
    { title: "Approve Seeker Responses", title_ar: "الموافقة على ردود الباحثين", description: "1 seeker has responded to your request.", description_ar: "رد باحث واحد على طلبك.", cta: "View Message", cta_ar: "عرض الرسالة", href: "/recruiter/messages", icon: <Inbox /> },
]

export default function RecruiterDashboard() {
  const { user, recruiterProfile, isProfileComplete, language } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (user && !isProfileComplete) {
      router.replace('/recruiter/welcome');
    }
  }, [isProfileComplete, router, user]);

  if (!isProfileComplete || !user) {
    return (
        <div className="space-y-6">
            <Skeleton className="h-24 w-full" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
            </div>
             <Skeleton className="h-64 w-full" />
        </div>
    );
  }

  const kpiData = [
    { title: t('recruiter_dashboard_kpi_live_jobs' as any), value: 3, icon: <Briefcase />, href: "/recruiter/jobs?status=live" },
    { title: t('recruiter_dashboard_kpi_new_apps' as any), value: 5, icon: <Users />, href: "/recruiter/applications?stage=applied&when=today" },
    { title: t('recruiter_dashboard_kpi_pending_wakalas' as any), value: 2, icon: <FileCheck />, href: "/recruiter/applications?stage=wakala&needs=upload" },
    { title: t('recruiter_dashboard_kpi_pending_actions' as any), value: 4, icon: <AlertCircle />, href: "/recruiter/applications?needs=action" },
  ];

  return (
    <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi, i) => <KpiCard key={i} {...kpi} router={router} />)}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{t('recruiter_dashboard_my_jobs_title' as any)}</CardTitle>
                <CardDescription>{t('recruiter_dashboard_my_jobs_desc' as any)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockJobs.map((job, i) => (
                    <Card key={i} className="p-4">
                        <div className="flex justify-between items-start">
                            <h4 className="font-semibold">{language === 'ar' ? job.title_ar : job.title}</h4>
                             <Button variant="outline" size="sm" onClick={() => router.push('/recruiter/jobs/1')}>{t('recruiter_dashboard_view_button' as any)}</Button>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                             <Link href="/recruiter/applications?job=1&stage=applied" className="hover:underline">{t('recruiter_dashboard_job_applied' as any)}: <span className="font-bold text-foreground">{job.applied}</span></Link>
                             <Link href="/recruiter/applications?job=1&stage=shortlisted" className="hover:underline">{t('recruiter_dashboard_job_shortlisted' as any)}: <span className="font-bold text-foreground">{job.shortlisted}</span></Link>
                             <Link href="/recruiter/applications?job=1&stage=selected" className="hover:underline">{t('recruiter_dashboard_job_selected' as any)}: <span className="font-bold text-foreground">{job.selected}</span></Link>
                        </div>
                    </Card>
                ))}
              </CardContent>
            </Card>

             <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('recruiter_dashboard_action_required_title' as any)}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                       {mockActionItems.map((item, index) => (
                          <div key={index} className="flex items-start gap-4 p-3 rounded-lg border bg-amber-50 border-amber-200">
                               <div className="text-amber-600 mt-1">{item.icon}</div>
                               <div>
                                  <p className="font-semibold">{language === 'ar' ? item.title_ar : item.title}</p>
                                  <p className="text-sm text-muted-foreground">{language === 'ar' ? item.description_ar : item.description}</p>
                                  <Button variant="link" size="sm" className="p-0 h-auto mt-1" asChild><Link href={item.href}>{language === 'ar' ? item.cta_ar : item.cta}</Link></Button>
                               </div>
                          </div>
                       ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>{t('recruiter_dashboard_inbox_title' as any)}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground py-10">
                        <p>{t('recruiter_dashboard_inbox_desc' as any)}</p>
                    </CardContent>
                </Card>
             </div>
        </div>
    </div>
  );
}
