
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Briefcase, Users, ArrowRight, CalendarClock, CreditCard, UserPlus, UserRoundPlus, Ticket, Activity, ShieldAlert, BadgeInfo } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AgentSubmissionsPipeline } from "@/components/agent-submissions";
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

const mockRequirements = [
  { id: 1, title: 'Heavy Duty Driver', city: 'Riyadh', country: 'KSA', salary: 'SAR 4,500', urgency: 'urgent', headcount: 10 },
  { id: 2, title: 'Household Cook', city: 'Dubai', country: 'UAE', salary: 'AED 3,000', urgency: 'normal', headcount: 2 },
  { id: 3, title: 'Construction Painter', city: 'Doha', country: 'Qatar', salary: 'QAR 2,800', urgency: 'closing_soon', headcount: 25 },
];

const activityFeed = [
    { type: 'payment', details: 'Interest fee paid by Ravi Kumar for "HD Driver"', time: '2m ago' },
    { type: 'job_posted', details: 'New job for "Plumber" in UAE by Emaar', time: '5m ago' },
    { type: 'document', details: 'Medical report uploaded by Sunita Devi', time: '1h ago' },
    { type: 'payment', details: 'Receipt from Sub-Agent SA-007 for medicals', time: '3h ago' },
];

const pendingReceipts = [
    { candidate: "Aarav Sharma", purpose: "Medical Exam", amount: "₹5,000" },
    { candidate: "Fatima Khan", purpose: "Visa Stamping", amount: "₹10,000" },
]

export default function AgentDashboardPage() {
  const router = useRouter();
  const kycVerified = true; // Mock value

  const kpiData = [
    { title: "Assigned Requirements", value: 12, icon: <Briefcase />, href: "/job-seeker/agent/jobs" },
    { title: "Active Candidates", value: 48, icon: <Users />, href: "/job-seeker/agent/candidate-pool" },
    { title: "Submissions (30d)", value: 22, icon: <ArrowRight />, href: "/job-seeker/agent/submissions?range=30d" },
    { title: "Interviews Scheduled", value: 3, icon: <CalendarClock />, href: "/job-seeker/agent/interviews" },
    { title: "Payments Pending Review", value: 2, icon: <CreditCard />, href: "/job-seeker/agent/payments?status=pending" },
  ];

  return (
    <div className="space-y-6">
      {!kycVerified && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader className="flex flex-row items-center gap-4">
            <ShieldAlert className="h-6 w-6 text-yellow-700" />
            <div>
                <CardTitle className="text-yellow-800">Verification Required</CardTitle>
                <CardDescription className="text-yellow-700">
                    Finish your profile verification to submit candidates to recruiters.
                    <Button variant="link" className="p-0 pl-2 text-yellow-800" onClick={() => router.push('/job-seeker/agent/profile')}>Complete Verification</Button>
                </CardDescription>
            </div>
          </CardHeader>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpiData.map((kpi, i) => <KpiCard key={i} {...kpi} router={router} />)}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Recruiter Requirements Feed</CardTitle>
                    <CardDescription>Live job openings from recruiters ready for your candidates.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockRequirements.map(job => (
                        <Card key={job.id}>
                            <CardHeader>
                                <CardTitle className="text-base">{job.title}</CardTitle>
                                <CardDescription>{job.city}, {job.country}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="font-bold text-primary">{job.salary}</div>
                                <div className="text-sm text-muted-foreground">Headcount: {job.headcount}</div>
                                {job.urgency !== 'normal' && <Badge variant={job.urgency === 'urgent' ? 'destructive' : 'secondary'}>{job.urgency === 'urgent' ? "Urgent" : "Closing Soon"}</Badge>}
                            </CardContent>
                            <CardFooter className="gap-2">
                                <Button size="sm">Suggest Candidates</Button>
                                <Button size="sm" variant="outline">Open Details</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </CardContent>
            </Card>

            <AgentSubmissionsPipeline />
        </div>
        
        <div className="space-y-6">
            <Card>
                <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                    <Button variant="outline"><UserPlus className="mr-2"/>Add Candidate</Button>
                    <Button variant="outline"><UserRoundPlus className="mr-2"/>Invite Sub-Agent</Button>
                    <Button variant="outline" className="col-span-2"><Ticket className="mr-2"/>Upload Ticket/Docs</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Activity Feed</CardTitle></CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {activityFeed.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="p-2 bg-muted rounded-full mt-1">
                                    <Activity className="h-4 w-4 text-muted-foreground"/>
                                </div>
                                <div className="text-sm">
                                    <p>{item.details}</p>
                                    <p className="text-xs text-muted-foreground">{item.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Compliance & Payments</CardTitle>
                    <CardDescription>Receipts from sub-agents awaiting your verification.</CardDescription>
                </CardHeader>
                <CardContent>
                     {pendingReceipts.map((receipt, i) => (
                         <div key={i} className="flex justify-between items-center p-2 border-b last:border-0">
                            <div>
                                <p className="text-sm font-medium">{receipt.candidate}</p>
                                <p className="text-xs text-muted-foreground">{receipt.purpose} - <span className="font-semibold text-foreground">{receipt.amount}</span></p>
                            </div>
                            <Button size="sm" variant="outline" asChild>
                                <Link href="/job-seeker/agent/payments">Review</Link>
                            </Button>
                         </div>
                     ))}
                </CardContent>
            </Card>
        </div>
      </div>

    </div>
  );
}
