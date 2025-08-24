
"use client";

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AgentDashboard() {
  const { agentProfile } = useAuth();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Agent Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {agentProfile?.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is your agent dashboard. More features coming soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
