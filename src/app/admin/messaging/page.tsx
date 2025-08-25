
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AdminMessagingPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Messaging Center</CardTitle>
                    <CardDescription>Review conversations and broadcast messages.</CardDescription>
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
                        <TabsTrigger value="agents">Agents</TabsTrigger>
                        <TabsTrigger value="subagents">Sub-Agents</TabsTrigger>
                        <TabsTrigger value="seekers">Job Seekers</TabsTrigger>
                        <TabsTrigger value="flagged">Flagged</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-4">
                        <div className="text-center text-muted-foreground py-12">
                            <p>Message threads will appear here.</p>
                        </div>
                    </TabsContent>
                 </Tabs>
            </CardContent>
        </Card>
    );
}
