
"use client";

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRight, Briefcase, CalendarClock, UserPlus, Users, FilePlus, Receipt, UserRoundCheck, ClipboardCheck, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AgentSubmissionsPipeline } from '@/components/agent-submissions';

const kpiData = [
    { title: "Assigned Requirements", value: 4, icon: <Briefcase />, href: "/job-seeker/agent/jobs" },
    { title: "Active Candidates", value: 12, icon: <Users />, href: "/job-seeker/agent/candidate-pool" },
    { title: "Submissions This Month", value: 8, icon: <ClipboardCheck />, href: "/job-seeker/agent/submissions" },
    { title: "Interviews Scheduled", value: 2, icon: <CalendarClock />, href: "/job-seeker/agent/interviews" },
    { title: "Payments Pending Review", value: 1, icon: <Receipt />, href: "/job-seeker/agent/payments?status=pending" },
];

const quickActions = [
    { title: "Add Candidate", icon: <UserPlus /> },
    { title: "Invite Sub-Agent", icon: <UserRoundCheck /> },
    { title: "Upload Ticket/Travel Docs", icon: <FilePlus /> },
];

const mockJobs = [
    { id: 1, title: "Heavy Duty Driver", city: "Dubai", country: "UAE", salary: "4500 AED", urgency: "Urgent", headcount: 5 },
    { id: 2, title: "Construction Painter", city: "Riyadh", country: "KSA", salary: "3000 SAR", urgency: "Normal", headcount: 10 },
];

const activityFeed = [
    { text: "Recruiter 'Al-Futtaim' posted a new job for 'Heavy Duty Driver'", time: "2h ago" },
    { text: "Seeker 'Ravi K.' paid the interest fee for 'Construction Painter'", time: "5h ago" },
    { text: "Medical report uploaded for 'Aisha B.' for job 'Household Cook'", time: "1d ago" },
];

export default function AgentDashboardPage() {
  const { agentProfile } = useAuth();
  const router = useRouter();

  return (
    <div className="space-y-6">
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
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
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>New Recruiter Requirements</CardTitle>
                        <CardDescription>Jobs posted by recruiters that match your candidates.</CardDescription>
                    </div>
                    <Button variant="link" onClick={() => router.push('/job-seeker/agent/jobs')}>View all</Button>
                </CardHeader>
                <CardContent className="space-y-3">
                    {mockJobs.map(job => (
                        <Card key={job.id} className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold">{job.title}</h4>
                                    <p className="text-sm text-muted-foreground">{job.city}, {job.country} • {job.salary}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                     {job.urgency === 'Urgent' && <Badge variant="destructive">Urgent</Badge>}
                                    <Button size="sm">Suggest Candidates</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </CardContent>
            </Card>

        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader><CardTitle>Activity Feed</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                      {activityFeed.map((item, index) => (
                          <li key={index} className="flex items-center gap-3">
                              <div className="p-2 bg-muted rounded-full">
                                  <Activity className="h-4 w-4 text-muted-foreground"/>
                              </div>
                              <div className="text-sm">
                                  <p>{item.text}</p>
                                  <p className="text-xs text-muted-foreground">{item.time}</p>
                              </div>
                          </li>
                      ))}
                  </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Payments & Compliance</CardTitle></CardHeader>
                 <CardContent>
                    <div className="p-4 rounded-lg border bg-amber-50 border-amber-200">
                        <p className="font-semibold">1 Receipt from Sub-Agents</p>
                        <p className="text-sm text-muted-foreground">Awaiting your verification.</p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-1" onClick={() => router.push('/job-seeker/agent/payments?status=pending')}>Review Now</Button>
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>
      
      <AgentSubmissionsPipeline />

    </div>
  );
}
