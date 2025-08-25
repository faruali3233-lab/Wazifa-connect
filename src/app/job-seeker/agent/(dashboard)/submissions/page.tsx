
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, Kanban, List } from "lucide-react";
import { useState } from "react";
import { FullSubmissionsPipeline } from "@/components/agent-submissions";

export default function AgentSubmissionsPage() {
    const [view, setView] = useState<'board' | 'table'>('board');

    return (
        <div className="space-y-6 flex flex-col h-[calc(100vh-10rem)]">
            <Card className="flex-shrink-0">
                <CardHeader>
                    <CardTitle>Submissions Pipeline</CardTitle>
                    <CardDescription>A comprehensive view of all candidates in the hiring pipeline.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Stage <ChevronDown className="ml-2 h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Recruiter <ChevronDown className="ml-2 h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Sub-Agent <ChevronDown className="ml-2 h-4 w-4" /></Button>
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
                </CardContent>
            </Card>

            {view === 'board' ? (
                <FullSubmissionsPipeline />
            ) : (
                 <Card className="flex-1">
                     <CardContent className="p-6">
                        <p className="text-center text-muted-foreground py-12">Table view is under construction.</p>
                     </CardContent>
                 </Card>
            )}
        </div>
    );
}

