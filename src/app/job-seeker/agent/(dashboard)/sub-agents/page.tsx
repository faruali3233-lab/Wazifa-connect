
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserPlus } from "lucide-react";
import CopyButton from "@/components/copy-button";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

const mockSubAgents = [
    { id: 'SA-01', name: 'Sanjay Patel', candidates: 15, submissions: 8, selectRate: "25%", status: "Active" },
    { id: 'SA-02', name: 'Meera Desai', candidates: 5, submissions: 2, selectRate: "50%", status: "Active" },
    { id: 'SA-03', name: 'Amit Singh', candidates: 0, submissions: 0, selectRate: "0%", status: "Suspended" },
];

export default function AgentSubAgentsPage() {
    const { agentProfile } = useAuth();
    
    if (!agentProfile) {
        return <Skeleton className="h-96 w-full" />
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-start justify-between">
                    <div>
                        <CardTitle>Manage Sub-Agents</CardTitle>
                        <CardDescription>Invite and manage your network of sub-agents.</CardDescription>
                         <div className="flex items-center gap-2 mt-4">
                           <span className="text-sm font-medium text-muted-foreground">Your Sub-Agent Referral Code:</span>
                           <Badge variant="outline">{agentProfile.referralCode}</Badge>
                           <CopyButton textToCopy={agentProfile.referralCode} />
                        </div>
                    </div>
                    <Button><UserPlus className="mr-2 h-4 w-4" /> Invite Sub-Agent</Button>
                </CardHeader>
                <CardContent>
                     <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Sub-Agent</TableHead>
                                    <TableHead>Candidates</TableHead>
                                    <TableHead>Submissions</TableHead>
                                    <TableHead>Select %</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockSubAgents.map((sa) => (
                                    <TableRow key={sa.id}>
                                        <TableCell className="font-medium">{sa.name} ({sa.id})</TableCell>
                                        <TableCell>{sa.candidates}</TableCell>
                                        <TableCell>{sa.submissions}</TableCell>
                                        <TableCell>{sa.selectRate}</TableCell>
                                        <TableCell><Badge variant={sa.status === 'Active' ? 'default' : 'destructive'}>{sa.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Message</DropdownMenuItem>
                                                    <DropdownMenuItem>Suspend</DropdownMenuItem>
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
