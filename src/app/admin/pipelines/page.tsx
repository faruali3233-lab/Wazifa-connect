
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, Kanban, List } from "lucide-react";
import { useState } from "react";

const mockSubmissions = [
    { id: 'SUB-001', candidate: 'Ravi Kumar', job: 'Heavy Duty Driver', recruiter: 'Al-Futtaim', agent: 'Sanjay Patel', stage: 'Shortlisted', updated: '2h ago' },
    { id: 'SUB-002', candidate: 'Aisha Begum', job: 'Household Cook', recruiter: 'Private Villa', agent: 'Sanjay Patel', stage: 'Submitted', updated: '1d ago' },
    { id: 'SUB-003', candidate: 'Manoj Verma', job: 'Construction Painter', recruiter: 'Emaar', agent: 'Sanjay Patel', stage: 'Selected', updated: '3d ago' },
];

const stages = ["Submitted", "Shortlisted", "Selected", "Offer", "Ticketed", "Hired"];

export default function AdminPipelinesPage() {
    const [view, setView] = useState<'table' | 'board'>('table');

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Global Hiring Pipelines</CardTitle>
                    <CardDescription>A comprehensive view of all candidates in the hiring pipeline across all jobs.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Stage <ChevronDown className="ml-2 h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {stages.map(s => <DropdownMenuCheckboxItem key={s}>{s}</DropdownMenuCheckboxItem>)}
                                </DropdownMenuContent>
                            </DropdownMenu>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Recruiter <ChevronDown className="ml-2 h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Agent <ChevronDown className="ml-2 h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                             <Button variant={view === 'table' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('table')}>
                                <List className="h-4 w-4" />
                            </Button>
                             <Button variant={view === 'board' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('board')}>
                                <Kanban className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {view === 'table' ? (
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Candidate</TableHead>
                                        <TableHead>Job</TableHead>
                                        <TableHead>Recruiter</TableHead>
                                        <TableHead>Agent</TableHead>
                                        <TableHead>Stage</TableHead>
                                        <TableHead>Last Update</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockSubmissions.map((sub) => (
                                        <TableRow key={sub.id}>
                                            <TableCell className="font-medium">{sub.candidate}</TableCell>
                                            <TableCell>{sub.job}</TableCell>
                                            <TableCell>{sub.recruiter}</TableCell>
                                            <TableCell>{sub.agent}</TableCell>
                                            <TableCell>{sub.stage}</TableCell>
                                            <TableCell>{sub.updated}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm">View</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {stages.map(stage => (
                                <div key={stage} className="bg-muted/50 rounded-lg p-3">
                                    <h3 className="font-semibold mb-4">{stage}</h3>
                                    <div className="space-y-3">
                                        {mockSubmissions.filter(s => s.stage === stage).map(sub => (
                                            <Card key={sub.id} className="p-3">
                                                <p className="font-medium text-sm">{sub.candidate}</p>
                                                <p className="text-xs text-muted-foreground">{sub.job}</p>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
