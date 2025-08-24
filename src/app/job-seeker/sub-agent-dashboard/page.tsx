
"use client";

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SubAgentDashboard() {
  const { subAgentProfile } = useAuth();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Sub Agent Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {subAgentProfile?.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is your sub-agent dashboard. More features coming soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
