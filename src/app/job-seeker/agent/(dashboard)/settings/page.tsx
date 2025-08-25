
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function AgentSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your notifications and compliance settings.</p>
            </div>
             <Tabs defaultValue="notifications" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="team">Team Options</TabsTrigger>
                    <TabsTrigger value="compliance">Compliance</TabsTrigger>
                </TabsList>
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Choose how you want to be notified about important events.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <p className="font-medium">New Job from Recruiter</p>
                                    <p className="text-sm text-muted-foreground">When a new job matching your profile is posted.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                             <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <p className="font-medium">Medical/Ticket Uploaded</p>
                                    <p className="text-sm text-muted-foreground">When a candidate or you upload a key document.</p>
                                </div>
                                <Switch defaultChecked />
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
