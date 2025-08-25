
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Users, UserPlus, Briefcase, ShieldCheck, AlertTriangle, ArrowRight, BarChart, ExternalLink, UserCheck, Search, Activity, LineChart, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const kpiData = [
    { title: "Active Users Now", value: 128, icon: <Users className="text-green-500" />, href: "/admin/users?active=now" },
    { title: "Registrations Today", value: 62, icon: <UserPlus className="text-blue-500" />, href: "/admin/users?created=today" },
    { title: "Total Users", value: "18,423", icon: <Users className="text-indigo-500" />, href: "/admin/users" },
    { title: "Jobs Posted Today", value: 14, icon: <Briefcase className="text-amber-500" />, href: "/admin/jobs?created=today" },
    { title: "Live Jobs", value: 302, icon: <Briefcase className="text-green-500" />, href: "/admin/jobs?status=live" },
    { title: "Pending KYC", value: 23, icon: <ShieldCheck className="text-yellow-500" />, href: "/admin/kyc?status=pending" },
    { title: "Flagged Payments", value: 6, icon: <AlertTriangle className="text-red-500" />, href: "/admin/payments?status=flagged" },
];

const liveUserData = [
  { name: '14:50', users: 82 },
  { name: '14:51', users: 95 },
  { name: '14:52', users: 101 },
  { name: '14:53', users: 117 },
  { name: '14:54', users: 113 },
  { name: '14:55', users: 128 },
];

const activityFeed = [
    { type: 'user_registered', details: 'New Agent from India', time: '2m ago' },
    { type: 'job_posted', details: 'New job for "Driver" in UAE', time: '5m ago' },
    { type: 'worker_selected', details: 'Candidate C-123 selected for J-456', time: '10m ago' },
    { type: 'kyc_submitted', details: 'Job Seeker S-789 submitted KYC', time: '12m ago' },
    { type: 'payment_uploaded', details: 'Receipt from Sub-Agent SA-007', time: '15m ago' },
];

export default function AdminOverviewPage() {
    const router = useRouter();

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
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
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Real-time Online Users</CardTitle>
                        <CardDescription>Last 15 minutes</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={liveUserData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                                <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUsers)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Today's Activity Feed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {activityFeed.map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="p-2 bg-muted rounded-full">
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
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Global Funnel (Today)</CardTitle>
                        <CardDescription>Candidate progression through the hiring stages.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground py-10">
                        <p>Funnel chart widget placeholder.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Geo/Role Heatmap</CardTitle>
                         <CardDescription>Visualize user and job distribution.</CardDescription>
                    </CardHeader>
                     <CardContent className="text-center text-muted-foreground py-10">
                        <p>Heatmap widget placeholder.</p>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
