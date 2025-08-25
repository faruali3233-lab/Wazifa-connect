
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockSubAgents = [
    { id: 'USR-005', name: 'Manoj Verma', phone: '+91 9876543212', kyc: 'Verified', parentAgent: 'Sanjay Patel', candidates: 5, receiptsPending: 1, created: '2024-08-13' },
];

export default function AdminSubAgentsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Directory: Sub-Agents</CardTitle>
                <CardDescription>Search, filter, and manage all sub-agents on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative mb-4">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search sub-agents by name, phone, or ID..." className="pl-8 w-full" />
                </div>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Parent Agent</TableHead>
                                <TableHead>KYC</TableHead>
                                <TableHead>Candidates</TableHead>
                                <TableHead>Receipts Pending</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockSubAgents.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-mono text-xs">{user.id}</TableCell>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.parentAgent}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.kyc === 'Verified' ? 'default' : 'secondary'}>
                                            {user.kyc}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{user.candidates}</TableCell>
                                    <TableCell>{user.receiptsPending}</TableCell>
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
