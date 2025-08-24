
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AgentDashboardPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to your Agent Dashboard</CardTitle>
                    <CardDescription>
                        This is your central hub for managing candidates, sub-agents, and job submissions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>More features and widgets will be added here soon to help you track your performance and earnings.</p>
                    <Button className="mt-4">View Job Requirements</Button>
                </CardContent>
            </Card>
        </div>
    );
}
