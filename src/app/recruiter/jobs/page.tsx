
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

const mockJobs = [
    { id: 'JOB-001', title: 'Heavy Duty Driver', location: 'Dubai, UAE', salary: 'AED 4,500', status: 'Live', apps: 12, created: '2024-08-15' },
    { id: 'JOB-002', title: 'Household Cook', location: 'Riyadh, KSA', salary: 'SAR 3,000', status: 'Live', apps: 23, created: '2024-08-14' },
    { id: 'JOB-003', title: 'Construction Painter', location: 'Abu Dhabi, UAE', salary: 'Negotiable', status: 'Paused', apps: 8, created: '2024-08-12' },
];

export default function RecruiterJobsPage() {
    const router = useRouter();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Manage Jobs</CardTitle>
                    <CardDescription>Post new jobs and manage your existing listings.</CardDescription>
                </div>
                 <Button onClick={() => router.push('/recruiter/jobs/new')}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Post New Job
                </Button>
            </CardHeader>
            <CardContent>
                 <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Salary</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Apps</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockJobs.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell className="font-medium">{job.title}</TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>{job.salary}</TableCell>
                                    <TableCell>
                                        <Badge variant={job.status === 'Live' ? 'default' : 'secondary'}>
                                            {job.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{job.apps}</TableCell>
                                    <TableCell>{job.created}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Button variant="outline" size="sm">View</Button>
                                        <Button variant="outline" size="sm">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
