
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserPlus } from "lucide-react";
import { Progress } from "@/components/ui/progress";


const mockCandidates = [
    { id: 1, name: "Ravi Kumar", role: "Heavy Duty Driver", owner: "You", docs: "Verified", medical: "Accepted", profile: 100 },
    { id: 2, name: "Aisha Begum", role: "Household Cook", owner: "SA-01", docs: "Verified", medical: "Pending", profile: 90 },
    { id: 3, name: "Manoj Verma", role: "Construction Painter", owner: "You", docs: "Pending", medical: "Not Required", profile: 75 },
    { id: 4, name: "Sunita Singh", role: "Nanny", owner: "SA-02", docs: "Verified", medical: "Uploaded", profile: 100 },
];

export default function AgentCandidatePoolPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Candidate Pool</CardTitle>
                    <CardDescription>Manage candidates sourced by you and your sub-agents.</CardDescription>
                </div>
                <Button><UserPlus className="mr-2 h-4 w-4" /> Add Candidate</Button>
            </CardHeader>
            <CardContent>
                 <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Documents</TableHead>
                                <TableHead>Medical</TableHead>
                                <TableHead>Profile %</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockCandidates.map((candidate) => (
                                <TableRow key={candidate.id}>
                                    <TableCell className="font-medium">{candidate.name}</TableCell>
                                    <TableCell>{candidate.role}</TableCell>
                                    <TableCell>{candidate.owner}</TableCell>
                                    <TableCell><Badge variant={candidate.docs === 'Verified' ? 'default' : 'secondary'}>{candidate.docs}</Badge></TableCell>
                                    <TableCell><Badge variant={candidate.medical === 'Accepted' ? 'default' : candidate.medical === 'Pending' ? 'destructive' : 'secondary'}>{candidate.medical}</Badge></TableCell>
                                    <TableCell><Progress value={candidate.profile} className="h-2" /></TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                <DropdownMenuItem>Submit to Job</DropdownMenuItem>
                                                <DropdownMenuItem>Upload Documents</DropdownMenuItem>
                                                <DropdownMenuItem>Review Medical</DropdownMenuItem>
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
    );
}

    