
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockUsers = [
    { id: 'USR-001', name: 'Ravi Kumar', phone: '+91 9876543210', role: 'Job Seeker', kyc: 'Verified', profilePct: '100%', created: '2024-08-15' },
    { id: 'USR-002', name: 'Alia Hassan', phone: '+971 501234567', role: 'Recruiter', kyc: 'N/A', profilePct: '90%', created: '2024-08-15' },
    { id: 'USR-003', name: 'Sanjay Patel', phone: '+91 9876543211', role: 'Agent', kyc: 'Pending', profilePct: '100%', created: '2024-08-14' },
    { id: 'USR-004', name: 'Fatima Al Mansoori', phone: '+966 555123456', role: 'Recruiter', kyc: 'N/A', profilePct: '100%', created: '2024-08-14' },
    { id: 'USR-005', name: 'Manoj Verma', phone: '+91 9876543212', role: 'Sub-Agent', kyc: 'Verified', profilePct: '100%', created: '2024-08-13' },
];

export default function AdminUsersPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Directory</CardTitle>
                <CardDescription>Search, filter, and manage all users on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative mb-4">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search users by name, phone, or ID..." className="pl-8 w-full" />
                </div>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>KYC</TableHead>
                                <TableHead>Profile %</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-mono text-xs">{user.id}</TableCell>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.kyc === 'Verified' ? 'default' : user.kyc === 'Pending' ? 'secondary' : 'outline'}>
                                            {user.kyc}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{user.profilePct}</TableCell>
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
