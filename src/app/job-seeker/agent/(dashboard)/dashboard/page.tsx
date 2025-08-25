
"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users, CheckSquare, TrendingUp, HandCoins, UserPlus, Ticket } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const kpiData = [
    { title: "Assigned Requirements", value: 12, icon: <Briefcase />, href: "/job-seeker/agent/jobs" },
    { title: "Active Candidates", value: 45, icon: <Users />, href: "/job-seeker/agent/candidate-pool" },
    { title: "Submissions This Month", value: 18, icon: <CheckSquare />, href: "/job-seeker/agent/submissions" },
    { title: "Interviews Scheduled", value: 4, icon: <TrendingUp />, href: "/job-seeker/agent/interviews" },
    { title: "Payments to Review", value: 2, icon: <HandCoins />, href: "/job-seeker/agent/payments?status=pending" },
];

const mockJobs = [
    { id: 1, title: "Heavy Duty Driver", recruiter: "Al-Futtaim", quota: 5, urgency: "Urgent" },
    { id: 2, title: "Construction Painter", recruiter: "Emaar", quota: 10, urgency: "Normal" },
    { id: 3, title: "Household Cook", recruiter: "Private Villa", quota: 1, urgency: "Closing Soon" },
]

const mockActivity = [
    { text: "Recruiter 'Emaar' posted a new job for 'Construction Painter'.", time: "2h ago" },
    { text: "Seeker 'Ravi Kumar' paid the interest fee for job 'Heavy Duty Driver'.", time: "5h ago" },
    { text: "Medical report uploaded for 'Aisha Begum'.", time: "1d ago" },
    { text: "Wakala received for 'Manoj Verma'.", time: "2d ago" },
]

export default function AgentDashboardPage() {
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
                            <CardTitle>Recruiter Requirements (Jobs)</CardTitle>
                            <CardDescription>New job postings from recruiters in the Gulf region.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {mockJobs.map(job => (
                                <Card key={job.id} className="p-4 flex flex-wrap justify-between items-center">
                                    <div>
                                        <h4 className="font-semibold">{job.title}</h4>
                                        <p className="text-sm text-muted-foreground">{job.recruiter} • Quota: {job.quota}</p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                                        {job.urgency !== "Normal" && <Badge variant={job.urgency === 'Urgent' ? 'destructive' : 'secondary'}>{job.urgency}</Badge>}
                                        <Button size="sm">Suggest Candidates</Button>
                                    </div>
                                </Card>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full" onClick={() => router.push('/job-seeker/agent/jobs')}>View All Jobs</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Submissions Pipeline Snapshot</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-around text-center">
                            <div><p className="text-2xl font-bold">18</p><p className="text-sm text-muted-foreground">Submitted</p></div>
                            <div><p className="text-2xl font-bold">11</p><p className="text-sm text-muted-foreground">Shortlisted</p></div>
                            <div><p className="text-2xl font-bold">6</p><p className="text-sm text-muted-foreground">Selected</p></div>
                             <div><p className="text-2xl font-bold">2</p><p className="text-sm text-muted-foreground">Ticketed</p></div>
                            <div><p className="text-2xl font-bold">1</p><p className="text-sm text-muted-foreground">Hired</p></div>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="space-y-6">
                     <Card>
                        <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 gap-2">
                           <Button variant="outline" className="justify-start"><UserPlus className="mr-2 h-4 w-4"/>Add Candidate</Button>
                           <Button variant="outline" className="justify-start"><Users className="mr-2 h-4 w-4"/>Invite Sub-Agent</Button>
                           <Button variant="outline" className="justify-start"><Ticket className="mr-2 h-4 w-4"/>Upload Ticket/Travel Docs</Button>
                        </CardContent>
                     </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity Feed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {mockActivity.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="mt-1 flex-shrink-0 h-2.5 w-2.5 rounded-full bg-primary" />
                                        <div className="text-sm">
                                            <p>{item.text}</p>
                                            <p className="text-xs text-muted-foreground">{item.time}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

    