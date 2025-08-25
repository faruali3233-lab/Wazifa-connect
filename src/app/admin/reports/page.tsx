
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { AreaChart, BarChart, DonutChart } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 22",
    "Applied": 2890,
    "Shortlisted": 1890,
  },
  {
    date: "Feb 22",
    "Applied": 2756,
    "Shortlisted": 2112,
  },
];

export default function AdminReportsPage() {
    const [range, setRange] = useState("30d");

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Reports & Analytics</h1>
                    <p className="text-muted-foreground">Dashboards for key metrics and data export functionality.</p>
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">{`Last ${range === '30d' ? '30 days' : range === '7d' ? '7 days' : '24 hours'}`}</Button>
                        </DropdownMenuTrigger>
                         <DropdownMenuContent>
                            <DropdownMenuRadioGroup value={range} onValueChange={setRange}>
                                <DropdownMenuRadioItem value="24h">Last 24 hours</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="7d">Last 7 days</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="30d">Last 30 days</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                         </DropdownMenuContent>
                    </DropdownMenu>
                    <Button>Export</Button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Candidate Funnel</CardTitle>
                        <CardDescription>Progression from application to hired.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BarChart
                            className="mt-6"
                            data={chartdata}
                            index="date"
                            categories={["Applied", "Shortlisted"]}
                            colors={["blue", "teal"]}
                            yAxisWidth={48}
                        />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Recruiter Performance</CardTitle>
                        <CardDescription>Time-to-review and selection rates.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center text-muted-foreground h-[300px]">
                        <p>Chart placeholder</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
