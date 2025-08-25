
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, PlusCircle, List, LayoutGrid, MoreHorizontal, FileCheck, FileWarning, ShieldCheck, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mockCandidates = [
    { id: 'CAND-001', name: 'Ravi Kumar', role: 'Heavy Duty Driver', skills: '5+ years experience, GCC License', location: 'Mumbai, IN', owner: 'You', docs: 'ok', medical: 'accepted', profilePct: 100, tags: ['Ready'] },
    { id: 'CAND-002', name: 'Aisha Begum', role: 'Household Cook', skills: 'Indian & Arabic cuisine', location: 'Delhi, IN', owner: 'SA: Priya Sharma', docs: 'ok', medical: 'none', profilePct: 90, tags: ['Blocked'] },
    { id: 'CAND-003', name: 'Manoj Verma', role: 'Construction Painter', skills: 'Spray painting, finishing', location: 'Kolkata, IN', owner: 'You', docs: 'missing', medical: 'none', profilePct: 65, tags: ['Blocked'] },
    { id: 'CAND-004', name: 'Sunita Patil', role: 'Nanny', skills: '3 years experience, First Aid', location: 'Pune, IN', owner: 'You', docs: 'ok', medical: 'pending', profilePct: 95, tags: ['Ready'] },
];

const DocsStatus = ({ status }: { status: string }) => {
    if (status === 'ok') return <Badge variant="outline" className="text-green-600 border-green-300 gap-1"><FileCheck className="h-3 w-3" /> OK</Badge>;
    return <Badge variant="destructive" className="gap-1"><FileWarning className="h-3 w-3" /> Missing</Badge>;
}

const MedicalStatus = ({ status }: { status: string }) => {
    if (status === 'accepted') return <Badge variant="outline" className="text-green-600 border-green-300 gap-1"><ShieldCheck className="h-3 w-3" /> Accepted</Badge>;
    if (status === 'pending') return <Badge variant="secondary" className="gap-1">Pending</Badge>;
    return <Badge variant="outline" className="gap-1"><ShieldAlert className="h-3 w-3" /> None</Badge>;
}


export default function AgentCandidatePoolPage() {
    const [view, setView] = useState<'table' | 'cards'>('table');

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Candidate Pool</CardTitle>
                        <CardDescription>Manage your and your sub-agents' candidates.</CardDescription>
                    </div>
                    <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Candidate</Button>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Owner <ChevronDown className="ml-2 h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Status <ChevronDown className="ml-2 h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                             <Button variant={view === 'table' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('table')}>
                                <List className="h-4 w-4" />
                            </Button>
                             <Button variant={view === 'cards' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('cards')}>
                                <LayoutGrid className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {view === 'table' ? (
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Owner</TableHead>
                                        <TableHead>Docs</TableHead>
                                        <TableHead>Medical</TableHead>
                                        <TableHead>Profile %</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockCandidates.map((cand) => (
                                        <TableRow key={cand.id}>
                                            <TableCell>
                                                <div className="font-medium">{cand.name}</div>
                                                <div className="text-xs text-muted-foreground">{cand.role}</div>
                                            </TableCell>
                                            <TableCell>{cand.location}</TableCell>
                                            <TableCell>{cand.owner}</TableCell>
                                            <TableCell><DocsStatus status={cand.docs} /></TableCell>
                                            <TableCell><MedicalStatus status={cand.medical} /></TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={cand.profilePct} className="h-2 w-20" />
                                                    <span className="text-xs font-mono">{cand.profilePct}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mockCandidates.map(cand => (
                                <Card key={cand.id}>
                                    <CardHeader>
                                        <CardTitle className="text-base">{cand.name}</CardTitle>
                                        <CardDescription>{cand.role}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="text-sm text-muted-foreground">Owner: {cand.owner}</div>
                                        <div className="flex justify-between">
                                            <DocsStatus status={cand.docs} />
                                            <MedicalStatus status={cand.medical} />
                                        </div>
                                         <div className="flex items-center gap-2">
                                            <Progress value={cand.profilePct} className="h-2 flex-1" />
                                            <span className="text-xs font-mono">{cand.profilePct}%</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
