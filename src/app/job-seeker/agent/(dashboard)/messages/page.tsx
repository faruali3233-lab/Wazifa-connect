
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AgentMessagesPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>Communicate with recruiters, sub-agents, candidates, and admins.</CardDescription>
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
                        <TabsTrigger value="recruiters">Recruiters</TabsTrigger>
                        <TabsTrigger value="subagents">Sub-Agents</TabsTrigger>
                        <TabsTrigger value="candidates">Candidates</TabsTrigger>
                        <TabsTrigger value="admin">Admin</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-4">
                        <div className="text-center text-muted-foreground py-12">
                            <p>Your message threads will appear here.</p>
                        </div>
                    </TabsContent>
                 </Tabs>
            </CardContent>
        </Card>
    );
}
