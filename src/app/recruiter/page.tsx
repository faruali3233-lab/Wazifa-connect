
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

const mockActionItems = [
    { title: "Review New Applications", description: "5 new candidates are waiting for your review.", cta: "Review Now", href: "/recruiter/applications?stage=applied&when=today", icon: <Users />},
    { title: "Upload Wakala", description: "3 candidates are waiting for their Wakala.", cta: "Upload Documents", href: "/recruiter/applications?stage=wakala&needs=upload", icon: <FileClock /> },
    { title: "Approve Seeker Responses", description: "1 seeker has responded to your request.", cta: "View Message", href: "/recruiter/messages", icon: <Inbox /> },
]

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
    { title: "New Applications (Today)", value: 5, icon: <Users />, href: "/recruiter/applications?stage=applied&when=today" },
    { title: "Pending Wakalas", value: 2, icon: <FileCheck />, href: "/recruiter/applications?stage=wakala&needs=upload" },
    { title: "Pending Actions", value: 4, icon: <AlertCircle />, href: "/recruiter/applications?needs=action" },
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
                             <Link href="/recruiter/applications?job=1&stage=applied" className="hover:underline">Applied: <span className="font-bold text-foreground">{job.applied}</span></Link>
                             <Link href="/recruiter/applications?job=1&stage=shortlisted" className="hover:underline">Shortlisted: <span className="font-bold text-foreground">{job.shortlisted}</span></Link>
                             <Link href="/recruiter/applications?job=1&stage=selected" className="hover:underline">Selected: <span className="font-bold text-foreground">{job.selected}</span></Link>
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
                    <CardContent className="space-y-3">
                       {mockActionItems.map((item, index) => (
                          <div key={index} className="flex items-start gap-4 p-3 rounded-lg border bg-amber-50 border-amber-200">
                               <div className="text-amber-600 mt-1">{item.icon}</div>
                               <div>
                                  <p className="font-semibold">{item.title}</p>
                                  <p className="text-sm text-muted-foreground">{item.description}</p>
                                  <Button variant="link" size="sm" className="p-0 h-auto mt-1" asChild><Link href={item.href}>{item.cta}</Link></Button>
                               </div>
                          </div>
                       ))}
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
