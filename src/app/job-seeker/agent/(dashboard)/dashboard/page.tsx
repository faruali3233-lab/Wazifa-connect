
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AgentDashboardPage() {
  const router = useRouter();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Dashboard</CardTitle>
        <CardDescription>Welcome to your dashboard. This area is under construction.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Your main dashboard with KPIs, requirements, and submissions will be displayed here soon.</p>
        <Button className="mt-4" onClick={() => router.push('/job-seeker/agent/my-profile')}>View My Profile</Button>
      </CardContent>
    </Card>
  );
}
