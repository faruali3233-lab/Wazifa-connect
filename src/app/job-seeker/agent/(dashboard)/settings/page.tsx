
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AgentSettingsPage() {
    return (
      <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your notifications, team settings, and compliance rules.</p>
        </div>
        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          <TabsContent value="notifications">
             <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified about important events.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <h4 className="font-medium text-sm">Email Notifications</h4>
                <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-medium">New Job from Recruiter</p>
                            <p className="text-sm text-muted-foreground">When a recruiter posts a new job matching your regions.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-medium">Medical Document Uploaded</p>
                            <p className="text-sm text-muted-foreground">When a seeker uploads a medical report for your review.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-medium">New Messages</p>
                            <p className="text-sm text-muted-foreground">For new messages from recruiters, sub-agents, or admins.</p>
                        </div>
                        <Switch />
                    </div>
                </div>
                 <div className="flex items-center justify-end mt-6">
                    <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preferences">
             <Card>
                <CardHeader>
                    <CardTitle>Team Preferences</CardTitle>
                    <CardDescription>Set rules for your sub-agents.</CardDescription>
                </CardHeader>
                 <CardContent className="space-y-6">
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-medium">Show Salary Bands to Sub-Agents</p>
                            <p className="text-sm text-muted-foreground">Allow sub-agents to see the salary ranges for jobs.</p>
                        </div>
                        <Switch />
                    </div>
                    <div className="flex items-center justify-end mt-6">
                        <Button>Save Changes</Button>
                    </div>
                 </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
}

    