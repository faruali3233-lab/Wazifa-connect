
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockSubAgents = [
    { id: 'SA-001', name: 'Priya Sharma', candidates: 15, submissions: 8, selectRate: '25%', flaggedReceipts: '0%', status: 'Active' },
    { id: 'SA-002', name: 'Rajesh Gupta', candidates: 5, submissions: 1, selectRate: '0%', flaggedReceipts: '50%', status: 'Active' },
    { id: 'SA-003', name: 'Amit Singh', candidates: 22, submissions: 18, selectRate: '33%', flaggedReceipts: '5%', status: 'Active' },
    { id: 'SA-004', name: 'Sunil Kumar', candidates: 0, submissions: 0, selectRate: 'N/A', flaggedReceipts: 'N/A', status: 'Suspended' },
];

export default function AgentSubAgentsPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Manage Sub-Agents</CardTitle>
                        <CardDescription>Invite, monitor, and manage your team of sub-agents.</CardDescription>
                    </div>
                    <Button><PlusCircle className="mr-2 h-4 w-4" /> Invite Sub-Agent</Button>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Candidates</TableHead>
                                    <TableHead>Submissions</TableHead>
                                    <TableHead>Select %</TableHead>
                                    <TableHead>Flagged Receipts %</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockSubAgents.map((sa) => (
                                    <TableRow key={sa.id}>
                                        <TableCell className="font-medium">{sa.name}</TableCell>
                                        <TableCell>{sa.candidates}</TableCell>
                                        <TableCell>{sa.submissions}</TableCell>
                                        <TableCell>{sa.selectRate}</TableCell>
                                        <TableCell>{sa.flaggedReceipts}</TableCell>
                                        <TableCell>
                                            <Badge variant={sa.status === 'Active' ? 'default' : 'destructive'}>{sa.status}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Message</DropdownMenuItem>
                                                    <DropdownMenuItem>{sa.status === 'Active' ? 'Suspend' : 'Unsuspend'}</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
