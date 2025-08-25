
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockUsers = [
    { id: 'USR-001', name: 'Ravi Kumar', phone: '+91 9876543210', kyc: 'Verified', profilePct: '100%', created: '2024-08-15' },
    { id: 'USR-003', name: 'Aisha Begum', phone: '+91 9876543212', kyc: 'Pending', profilePct: '75%', created: '2024-08-14' },
];

export default function AdminJobSeekersPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Directory: Job Seekers</CardTitle>
                <CardDescription>Search, filter, and manage all job seekers on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative mb-4">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search job seekers by name, phone, or ID..." className="pl-8 w-full" />
                </div>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
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
