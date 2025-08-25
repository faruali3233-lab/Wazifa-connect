
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { FullSubmissionsPipeline } from "@/components/agent-submissions";

export default function AgentSubmissionsPage() {
    return (
        <div className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>Submissions Pipeline</CardTitle>
                <CardDescription>Track all candidates submitted by you and your sub-agents.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 -ml-6 -mr-6 -mb-6">
                <FullSubmissionsPipeline />
            </CardContent>
        </div>
    );
}
