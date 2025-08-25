
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, Search } from "lucide-react";

const mockJobs = [
    { id: 1, title: "Heavy Duty Driver", recruiter: "Al-Futtaim Logistics", city: "Dubai", country: "UAE", salary: "4500 AED", urgency: "Urgent", headcount: 5, submitted: 2 },
    { id: 2, title: "Construction Painter", recruiter: "Emaar Properties", city: "Riyadh", country: "KSA", salary: "3000 SAR", urgency: "Normal", headcount: 10, submitted: 5 },
    { id: 3, title: "Household Cook", recruiter: "Private Villa", city: "Doha", country: "Qatar", salary: "3500 QAR", urgency: "Normal", headcount: 1, submitted: 1 },
    { id: 4, title: "AC Technician", recruiter: "Carrier", city: "Jeddah", country: "KSA", salary: "Negotiable", urgency: "Closing Soon", headcount: 3, submitted: 0 },
];

export default function AgentJobsPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Recruiter Requirements</CardTitle>
                    <CardDescription>Browse all active job requirements from recruiters and submit your candidates.</CardDescription>
                </CardHeader>
                 <CardContent>
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search by job title or recruiter..." className="pl-8" />
                        </div>
                        <div className="flex items-center gap-2">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button variant="outline">Role <ChevronDown className="ml-2 h-4 w-4" /></Button></DropdownMenuTrigger>
                            </DropdownMenu>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button variant="outline">City <ChevronDown className="ml-2 h-4 w-4" /></Button></DropdownMenuTrigger>
                            </DropdownMenu>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button variant="outline">Urgency <ChevronDown className="ml-2 h-4 w-4" /></Button></DropdownMenuTrigger>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockJobs.map(job => (
                            <Card key={job.id}>
                                <CardHeader>
                                    <CardTitle className="text-base">{job.title}</CardTitle>
                                    <CardDescription>{job.recruiter}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <p>{job.city}, {job.country}</p>
                                    <p className="font-bold text-primary">{job.salary}</p>
                                    <p>Headcount: {job.headcount}</p>
                                    <div className="flex gap-2 pt-2">
                                        {job.urgency === 'Urgent' && <Badge variant="destructive">Urgent</Badge>}
                                        {job.urgency === 'Closing Soon' && <Badge variant="secondary">Closing Soon</Badge>}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex-col items-start gap-3">
                                    <p className="text-xs text-muted-foreground">You submitted: {job.submitted}/{job.headcount}</p>
                                    <div className="flex w-full gap-2">
                                        <Button variant="outline" className="w-full">Details</Button>
                                        <Button className="w-full">Suggest Candidates</Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
