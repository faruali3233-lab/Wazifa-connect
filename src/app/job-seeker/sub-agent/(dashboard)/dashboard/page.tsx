
"use client";

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRight, Briefcase, CalendarClock, UserPlus, Users, FilePlus, Receipt } from 'lucide-react';

const kpiData = [
    { title: "Assigned Requirements", value: 0, icon: <Briefcase />, href: "/job-seeker/sub-agent/requirements" },
    { title: "Active Candidates", value: 0, icon: <Users />, href: "/job-seeker/sub-agent/candidate-pool" },
    { title: "Submissions This Month", value: 0, icon: <ArrowRight />, href: "/job-seeker/sub-agent/submissions" },
    { title: "Interviews Scheduled", value: 0, icon: <CalendarClock />, href: "/job-seeker/sub-agent/interviews" },
];

const quickActions = [
    { title: "Add Candidate", icon: <UserPlus /> },
    { title: "Upload Payment Receipt", icon: <Receipt /> },
    { title: "Book Medical", icon: <FilePlus /> },
];

export default function SubAgentDashboardPage() {
  const { subAgentProfile } = useAuth();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {subAgentProfile?.name}!</CardTitle>
          <CardDescription>This is your central hub for managing candidates and requirements from your parent agent.</CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push(kpi.href)}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                      <div className="text-muted-foreground">{kpi.icon}</div>
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">{kpi.value}</div>
                  </CardContent>
              </Card>
          ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
                <Button key={index} variant="outline" size="lg" className="justify-start gap-4 p-6">
                    {action.icon}
                    <span>{action.title}</span>
                </Button>
            ))}
        </CardContent>
      </Card>

       <Card>
        <CardHeader><CardTitle>Activity Feed</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">No recent activity. Real-time updates from your agent will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
