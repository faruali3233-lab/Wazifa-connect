
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, List } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const mockInterviews = [
    { id: 1, candidate: "Sunita Singh", job: "Nanny", recruiter: "Private Villa", date: new Date(), type: "Online" },
    { id: 2, candidate: "Ravi Kumar", job: "Heavy Duty Driver", recruiter: "Al-Futtaim", date: new Date(new Date().setDate(new Date().getDate() + 2)), type: "In-Person" },
];

export default function AgentInterviewsPage() {
    const [view, setView] = useState<'calendar' | 'list'>('list');
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                 <div>
                    <CardTitle>Interview Schedule</CardTitle>
                    <CardDescription>Manage upcoming interviews for your candidates.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('list')}><List className="h-4 w-4"/></Button>
                    <Button variant={view === 'calendar' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('calendar')}><CalendarIcon className="h-4 w-4"/></Button>
                </div>
            </CardHeader>
            <CardContent>
               {view === 'list' ? (
                   <div className="space-y-4">
                       {mockInterviews.map(interview => (
                           <Card key={interview.id} className="p-4 flex justify-between items-center">
                               <div>
                                   <p className="font-semibold">{interview.candidate} for {interview.job}</p>
                                   <p className="text-sm text-muted-foreground">{interview.recruiter}</p>
                               </div>
                               <div className="text-right">
                                   <p className="text-sm">{interview.date.toLocaleDateString()}</p>
                                   <Badge>{interview.type}</Badge>
                               </div>
                           </Card>
                       ))}
                   </div>
               ) : (
                   <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                    />
               )}
            </CardContent>
        </Card>
    );
}

    