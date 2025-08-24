
"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users, CheckSquare, TrendingUp } from 'lucide-react';
import { useRouter } from "next/navigation";

const kpiData = [
    { title: "Active Candidates", value: 0, icon: <Users />, href: "/job-seeker/agent/candidate-pool" },
    { title: "Open Jobs", value: 0, icon: <Briefcase />, href: "/job-seeker/agent/jobs" },
    { title: "Candidates Submitted", value: 0, icon: <CheckSquare />, href: "/job-seeker/agent/submissions" },
    { title: "Hired (Last 30d)", value: 0, icon: <TrendingUp />, href: "/job-seeker/agent/submissions?hired=true" },
];

const shortcutData = [
    { title: "View Job Requirements", href: "/job-seeker/agent/jobs" },
    { title: "Open Candidate Pool", href: "/job-seeker/agent/candidate-pool" },
    { title: "Go to Submissions", href: "/job-seeker/agent/submissions" },
    { title: "Review Payments", href: "/job-seeker/agent/payments" },
]

export default function AgentDashboardPage() {
    const router = useRouter();

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to your Agent Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This is your central hub for managing candidates, sub-agents, and job submissions.</p>
                </CardContent>
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

            <div className="grid gap-6 md:grid-cols-2">
                 {shortcutData.map((shortcut, index) => (
                    <Card key={index}>
                        <CardContent className="p-6 flex items-center justify-between">
                            <h3 className="font-semibold">{shortcut.title}</h3>
                            <Button asChild variant="outline">
                                <Link href={shortcut.href}>
                                    Go <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                 ))}
            </div>
        </div>
    );
}
