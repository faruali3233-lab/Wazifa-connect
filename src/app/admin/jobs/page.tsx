
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockJobs = [
    { id: 'JOB-001', title: 'Heavy Duty Driver', recruiter: 'Al-Futtaim Logistics', location: 'Dubai, UAE', status: 'Live' },
    { id: 'JOB-002', title: 'Household Cook', recruiter: 'Private Villa', location: 'Riyadh, KSA', status: 'Pending Approval' },
    { id: 'JOB-003', title: 'Construction Painter', recruiter: 'Emaar Properties', location: 'Abu Dhabi, UAE', status: 'Paused' },
];

export default function AdminJobsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Jobs Moderation</CardTitle>
                <CardDescription>Approve, pause, or edit job postings from recruiters.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Recruiter</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockJobs.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell className="font-mono text-xs">{job.id}</TableCell>
                                    <TableCell className="font-medium">{job.title}</TableCell>
                                    <TableCell>{job.recruiter}</TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>
                                        <Badge variant={job.status === 'Live' ? 'default' : 'secondary'}>
                                            {job.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="space-x-2">
                                        <Button variant="outline" size="sm">Approve</Button>
                                        <Button variant="outline" size="sm">Pause</Button>
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
