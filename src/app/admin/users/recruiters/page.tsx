
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockRecruiters = [
    { id: 'USR-002', name: 'Alia Hassan', company: 'Al-Futtaim Logistics', phone: '+971 501234567', jobsLive: 5, jobsToday: 1, created: '2024-08-15' },
    { id: 'USR-004', name: 'Fatima Al Mansoori', company: 'Emaar Properties', phone: '+966 555123456', jobsLive: 2, jobsToday: 0, created: '2024-08-14' },
];

export default function AdminRecruitersPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Directory: Recruiters</CardTitle>
                <CardDescription>Search, filter, and manage all recruiters on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative mb-4">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search recruiters by name, company, or ID..." className="pl-8 w-full" />
                </div>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Company/Contact</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Jobs Live</TableHead>
                                <TableHead>Jobs Today</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockRecruiters.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-mono text-xs">{user.id}</TableCell>
                                    <TableCell className="font-medium">
                                        <div>{user.company}</div>
                                        <div className="text-xs text-muted-foreground">{user.name}</div>
                                    </TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.jobsLive}</TableCell>
                                    <TableCell>{user.jobsToday}</TableCell>
                                    <TableCell>{user.created}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm">View</Button>
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
