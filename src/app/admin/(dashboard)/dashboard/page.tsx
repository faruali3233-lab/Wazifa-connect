
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">10,482</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Job Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">345</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hired (Last 30d)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">89</p>
          </CardContent>
        </Card>
      </div>

      <Card>
          <CardHeader>
            <CardTitle>Admin Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Welcome to the Admin Dashboard. Use the navigation on the left to manage different aspects of the GulfHired platform.</p>
            <p className="mt-4">More widgets and data visualizations will be added here soon.</p>
          </CardContent>
      </Card>
    </div>
  );
}
