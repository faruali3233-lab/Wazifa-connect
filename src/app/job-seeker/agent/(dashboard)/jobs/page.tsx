
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const mockRequirements = [
  { id: 1, title: 'Heavy Duty Driver', city: 'Riyadh', country: 'KSA', salary: 'SAR 4,500/mo', skills: 'GCC License, 5+ yrs', deadline: '2024-09-15', submissions: 3, urgency: 'urgent' },
  { id: 2, title: 'Household Cook', city: 'Dubai', country: 'UAE', salary: 'AED 3,000/mo', skills: 'Indian & Arabic cuisine', deadline: '2024-09-20', submissions: 8, urgency: 'normal' },
  { id: 3, title: 'Construction Painter', city: 'Doha', country: 'Qatar', salary: 'QAR 2,800/mo', skills: 'Spray painting, finishing', deadline: '2024-09-10', submissions: 1, urgency: 'closing_soon' },
  { id: 4, title: 'AC Technician', city: 'Jeddah', country: 'KSA', salary: 'SAR 3,500/mo', skills: 'HVAC certified, troubleshooting', deadline: '2024-09-18', submissions: 0, urgency: 'normal' },
];

export default function AgentJobsPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Recruiter Requirements</CardTitle>
                    <CardDescription>See all live recruiter requirements you can fill.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                       <div className="relative flex-1">
                           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                           <Input placeholder="Search by title, skills..." className="pl-8" />
                       </div>
                       <div className="flex items-center gap-2 flex-wrap">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Role <ChevronDown className="ml-2 h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Recruiter <ChevronDown className="ml-2 h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Urgency <ChevronDown className="ml-2 h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockRequirements.map(job => (
                            <Card key={job.id} className="flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">{job.title}</CardTitle>
                                            <CardDescription>{job.city}, {job.country}</CardDescription>
                                        </div>
                                         {job.urgency !== 'normal' && <Badge variant={job.urgency === 'urgent' ? 'destructive' : 'secondary'}>{job.urgency === 'urgent' ? "Urgent" : "Closing"}</Badge>}
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-3">
                                    <div className="font-bold text-lg text-primary">{job.salary}</div>
                                    <div>
                                        <h4 className="text-xs font-semibold text-muted-foreground">Skills</h4>
                                        <p className="text-sm">{job.skills}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-semibold text-muted-foreground">Your Submissions</h4>
                                        <p className="text-sm">{job.submissions}</p>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center">
                                    <span className="text-xs text-muted-foreground">Deadline: {job.deadline}</span>
                                    <Button size="sm">Suggest</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
