
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function RecruiterMessagesPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>Communicate with agents and job seekers (via moderation).</CardDescription>
                </div>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Message
                </Button>
            </CardHeader>
            <CardContent>
                 <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All Threads</TabsTrigger>
                        <TabsTrigger value="seeker_requests">Seeker Requests</TabsTrigger>
                        <TabsTrigger value="agents">Agents</TabsTrigger>
                        <TabsTrigger value="admin">Admin</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-4">
                        <div className="text-center text-muted-foreground py-12">
                            <p>Your message threads will appear here.</p>
                            <p className="text-xs mt-1">Requests for more information from job seekers will be moderated by an Admin.</p>
                        </div>
                    </TabsContent>
                 </Tabs>
            </CardContent>
        </Card>
    );
}
