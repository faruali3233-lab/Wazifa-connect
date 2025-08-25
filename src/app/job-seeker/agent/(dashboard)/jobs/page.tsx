
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const mockJobs = [
    { id: 1, title: "Heavy Duty Driver", recruiter: "Al-Futtaim Logistics", location: "Dubai, UAE", salary: "AED 4,500", urgency: "Urgent", quota: 5, submitted: 2 },
    { id: 2, title: "Household Cook", recruiter: "Private Villa", location: "Riyadh, KSA", salary: "SAR 3,000", urgency: "Normal", quota: 1, submitted: 1 },
    { id: 3, title: "Construction Painter", recruiter: "Emaar Properties", location: "Abu Dhabi, UAE", salary: "Negotiable", urgency: "Closing Soon", quota: 10, submitted: 5 },
    { id: 4, title: "AC Technician", recruiter: "Carrier", location: "Doha, Qatar", salary: "QAR 4,000", urgency: "Normal", quota: 3, submitted: 0 },
];

export default function AgentJobsPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Recruiter Requirements</CardTitle>
                    <CardDescription>Browse job postings from recruiters and submit your candidates.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search by title, role..." className="pl-8" />
                        </div>
                        <Select>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Filter by city" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="dubai">Dubai</SelectItem>
                                <SelectItem value="riyadh">Riyadh</SelectItem>
                                <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                                <SelectItem value="doha">Doha</SelectItem>
                            </SelectContent>
                        </Select>
                         <Select>
                            <SelectTrigger className="w-full md:w-[180px]">
                                <SelectValue placeholder="Filter by urgency" />
                            </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="urgent">Urgent</SelectItem>
                                <SelectItem value="closing-soon">Closing Soon</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockJobs.map(job => (
                            <Card key={job.id} className="flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">{job.title}</CardTitle>
                                        {job.urgency !== "Normal" && <Badge variant={job.urgency === 'Urgent' ? 'destructive' : 'secondary'}>{job.urgency}</Badge>}
                                    </div>
                                    <CardDescription>{job.recruiter} - {job.location}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-2">
                                    <p className="font-bold text-primary">{job.salary}</p>
                                    <p className="text-sm text-muted-foreground">Hiring Quota: <span className="font-semibold text-foreground">{job.quota}</span></p>
                                    <p className="text-sm text-muted-foreground">Your Submissions: <span className="font-semibold text-foreground">{job.submitted}</span></p>
                                </CardContent>
                                <CardFooter className="flex gap-2">
                                    <Button className="flex-1">Suggest Candidates</Button>
                                    <Button variant="outline">Details</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

    