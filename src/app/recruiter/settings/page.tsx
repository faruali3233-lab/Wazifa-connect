
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

export default function RecruiterSettingsPage() {
    return (
      <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your company profile, notifications, and policies.</p>
        </div>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Company Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>This information will be visible to job seekers and agents.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src="https://placehold.co/100x100.png" />
                        <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Upload Logo</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input id="companyName" defaultValue="Al-Futtaim Logistics" />
                    </div>
                    <div>
                        <Label htmlFor="companyWebsite">Company Website</Label>
                        <Input id="companyWebsite" defaultValue="https://www.al-futtaim.com" />
                    </div>
                </div>
                 <div>
                    <Label htmlFor="officeAddress">Office Address</Label>
                    <Textarea id="officeAddress" defaultValue="Dubai, UAE" />
                </div>
                <div className="flex items-center justify-end">
                    <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
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
                            <p className="font-medium">New Applications</p>
                            <p className="text-sm text-muted-foreground">Get notified when a new candidate applies to your job.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-medium">Medical Document Uploaded</p>
                            <p className="text-sm text-muted-foreground">Get notified when a seeker uploads a medical report.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-medium">New Messages</p>
                            <p className="text-sm text-muted-foreground">Get notified about new messages from agents or admins.</p>
                        </div>
                        <Switch />
                    </div>
                </div>
                 <div className="flex items-center justify-end">
                    <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
}
