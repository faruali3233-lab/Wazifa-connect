
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Briefcase, Users, MessageSquare, AlertCircle, FileCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslation } from '@/components/i18n-provider';

const KpiCard = ({ title, value, icon, href, router }: { title: string, value: string | number, icon: React.ReactNode, href: string, router: any }) => (
  <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push(href)}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const mockJobs = [
    { title: 'Heavy Duty Driver', applied: 12, shortlisted: 4, selected: 1 },
    { title: 'Construction Painter', applied: 8, shortlisted: 2, selected: 0 },
    { title: 'Household Cook', applied: 23, shortlisted: 8, selected: 2 },
];

export default function RecruiterDashboard() {
  const { user, recruiterProfile, isProfileComplete } = useAuth();
  const router = useRouter();

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
    { title: "Live Jobs", value: 3, icon: <Briefcase />, href: "/recruiter/jobs?status=live" },
    { title: "New Applications (Today)", value: 5, icon: <Users />, href: "/recruiter/applications?when=today" },
    { title: "Pending Wakalas", value: 2, icon: <FileCheck />, href: "/recruiter/applications?stage=wakala" },
    { title: "Pending Actions", value: 4, icon: <AlertCircle />, href: "/recruiter/applications?actions=required" },
  ];

  return (
    <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi, i) => <KpiCard key={i} {...kpi} router={router} />)}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>My Jobs</CardTitle>
                <CardDescription>A quick overview of your most recent job postings and their pipelines.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockJobs.map((job, i) => (
                    <Card key={i} className="p-4">
                        <div className="flex justify-between items-start">
                            <h4 className="font-semibold">{job.title}</h4>
                             <Button variant="outline" size="sm" onClick={() => router.push('/recruiter/jobs/1')}>View</Button>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                            <span>Applied: <span className="font-bold text-foreground">{job.applied}</span></span>
                             <span>Shortlisted: <span className="font-bold text-foreground">{job.shortlisted}</span></span>
                              <span>Selected: <span className="font-bold text-foreground">{job.selected}</span></span>
                        </div>
                    </Card>
                ))}
              </CardContent>
            </Card>

             <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Action Required</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground py-10">
                        <p>Tasks needing your attention will appear here.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Inbox Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground py-10">
                        <p>Recent messages will appear here.</p>
                    </CardContent>
                </Card>
             </div>
        </div>
    </div>
  );
}
