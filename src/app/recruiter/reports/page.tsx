
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { BarChart } from "@tremor/react";

const chartdata = [
  { name: "Applied", "Number of Applications": 248 },
  { name: "Interested", "Number of Applications": 145 },
  { name: "Medical", "Number of Applications": 98 },
  { name: "Wakala", "Number of Applications": 82 },
  { name: "Hired", "Number of Applications": 47 },
];

export default function RecruiterReportsPage() {
    const [range, setRange] = useState("30d");

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Reports</h1>
                    <p className="text-muted-foreground">Analyze your hiring funnel and agent performance.</p>
                </div>
                <div className="flex items-center gap-2">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">{`Last ${range === '30d' ? '30 days' : range === '7d' ? '7 days' : 'All Time'}`}</Button>
                        </DropdownMenuTrigger>
                         <DropdownMenuContent>
                            <DropdownMenuRadioGroup value={range} onValueChange={setRange}>
                                <DropdownMenuRadioItem value="7d">Last 7 days</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="30d">Last 30 days</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="all">All Time</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                         </DropdownMenuContent>
                    </DropdownMenu>
                    <Button>Export</Button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Hiring Funnel</CardTitle>
                        <CardDescription>Candidate progression from application to hired.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BarChart
                            className="mt-6"
                            data={chartdata}
                            index="name"
                            categories={["Number of Applications"]}
                            colors={["blue"]}
                            yAxisWidth={48}
                        />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Source Performance</CardTitle>
                        <CardDescription>Breakdown of hires by agent vs. sub-agent.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center text-muted-foreground h-[300px]">
                        <p>Chart placeholder</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
