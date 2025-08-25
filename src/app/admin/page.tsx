
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UserDirectory } from "@/components/user-directory";

export default function AdminDashboardPage() {
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
            <CardTitle>User Directory</CardTitle>
            <CardDescription>View, manage, and verify all users on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
            <UserDirectory />
        </CardContent>
      </Card>
    </div>
  );
}
