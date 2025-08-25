
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockAgents = [
    { id: 'USR-003', name: 'Sanjay Patel', phone: '+91 9876543211', kyc: 'Pending', verified: 'No', subAgents: 2, candidates: 15, created: '2024-08-14' },
];

export default function AdminAgentsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Directory: Agents</CardTitle>
                <CardDescription>Search, filter, and manage all agents on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative mb-4">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search agents by name, agency, or ID..." className="pl-8 w-full" />
                </div>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name/Agency</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>KYC</TableHead>
                                <TableHead>Verified</TableHead>
                                <TableHead>Sub-Agents</TableHead>
                                <TableHead>Candidates</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockAgents.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-mono text-xs">{user.id}</TableCell>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                     <TableCell>
                                        <Badge variant={user.kyc === 'Verified' ? 'default' : user.kyc === 'Pending' ? 'secondary' : 'outline'}>
                                            {user.kyc}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{user.verified}</TableCell>
                                    <TableCell>{user.subAgents}</TableCell>
                                    <TableCell>{user.candidates}</TableCell>
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
